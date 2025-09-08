import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const LocationIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();

  return (
    <Svg width="29" height="29" viewBox="0 0 24 24">
      <G fill="none" stroke={!focused ? theme.black : theme.appMainColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path d="M12.56 20.82a.96.96 0 0 1-1.12 0C6.611 17.378 1.486 10.298 6.667 5.182A7.6 7.6 0 0 1 12 3c2 0 3.919.785 5.333 2.181c5.181 5.116.056 12.196-4.773 15.64" />
        <Path d="M12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
      </G>
    </Svg>
  );
};
