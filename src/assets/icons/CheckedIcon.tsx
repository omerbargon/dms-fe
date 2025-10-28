import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const CheckedIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="12" height="12" viewBox="0 0 24 24">
      <Path fill="#FFF" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
    </Svg>
  );
};
