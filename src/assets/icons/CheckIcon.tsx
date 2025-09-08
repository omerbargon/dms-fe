import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const CheckIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="22" height="22" viewBox="0 0 24 24">
      <G fill="none" stroke={theme.appSecondaryColor} strokeWidth="1.5">
        <Circle cx="12" cy="12" r="9" />
        <Path d="m8 12l3 3l5-6" />
      </G>
    </Svg>
  );
};
