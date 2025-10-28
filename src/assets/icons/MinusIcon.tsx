import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const MinusIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="16" height="16" viewBox="0 0 24 24">
      <Path fill={theme.appSecondaryColor} d="M17 13H7v-2h10m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
    </Svg>
  );
};
