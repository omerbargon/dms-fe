import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const SpecificationsIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="21" height="21" viewBox="0 0 24 24">
      <G fill="none">
        <Circle cx="12" cy="12" r="9.25" stroke={theme.appSecondaryColor} strokeWidth="1.5" />
        <Path stroke={theme.appSecondaryColor} strokeLinecap="round" strokeWidth="1.5" d="M12 11.813v5" />
        <Circle cx="12" cy="8.438" r="1.25" fill={theme.appSecondaryColor} />
      </G>
    </Svg>
  );
};
