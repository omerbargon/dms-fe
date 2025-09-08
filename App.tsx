import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/locales/i18n';
import { ThemeProvider } from './src/theme';
import { LanguageProvider } from './src/locales/LanguageProvider';
import { AuthProvider } from './src/navigation/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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

export default App;


