import { ThemeMode } from './types';

export const APP_MAIN_COLOR = '#292A72';
export const APP_SECONDARY_COLOR = '#17a8d8';

export const createTheme = (mode: ThemeMode) => ({
  appMainColor: APP_MAIN_COLOR,
  appSecondaryColor: APP_SECONDARY_COLOR,
  selectedMainColor: '#292A7244',
  selectedSecondaryColor: mode === 'light' ? '#17a8d833' : '#17a8d833',
  black: mode === 'light' ? '#1e1e1e' : '#FFFFFF',
  white: mode === 'light' ? '#FFFFFF' : '#1e1e1e',
  borderColor: mode === 'light' ? '#E0E0E0' : '#3A3A3E',
  gray: '#808080',
  success: '#08851B',
  danger: '#D32F2F',
  linkColor: '#E09600',
  placeholder: '#A9A9A9',
});
