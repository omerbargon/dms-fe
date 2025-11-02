import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/locales/i18n';
import { ThemeProvider } from './src/theme';
import { LanguageProvider } from './src/locales/LanguageProvider';
import { AuthProvider } from './src/navigation/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { hydrateAuthState, loadAuthState } from './src/api/auth.slice';
import { store } from './src/api/store';

enableScreens();

function AppContent(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [hydrating, setHydrating] = React.useState(true);

  useEffect(() => {
    (async () => {
      try {
        const persistedAuth = await loadAuthState();
        store.dispatch(hydrateAuthState(persistedAuth));
      } catch (err) {
        console.error('Failed to hydrate auth state:', err);
      } finally {
        setHydrating(false);
      }
    })();
  }, []);

  if (hydrating) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <NavigationContainer>
        <ThemeProvider>
          <LanguageProvider>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </I18nextProvider>
          </LanguageProvider>
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
