import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITheme, ThemeMode } from './types';
import { createTheme } from './theme';
import RNRestart from 'react-native-restart';

interface ThemeContextType {
  mode: ThemeMode;
  theme: ITheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = createTheme(mode);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('@theme');
        if (storedTheme) {
          setMode(storedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    RNRestart.restart();
    try {
      await AsyncStorage.setItem('@theme', newMode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <React.Fragment>{children}</React.Fragment>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
