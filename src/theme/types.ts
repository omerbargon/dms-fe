import { createTheme } from './theme';

export type ThemeMode = 'light' | 'dark';
export type ITheme = ReturnType<typeof createTheme>;
