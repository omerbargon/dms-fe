import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const PoliciesIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();
  return (
    <Svg width="26" height="26" viewBox="0 0 24 24">
      <G fill="none" stroke={!focused ? theme.black : theme.appMainColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color={!focused ? theme.black : theme.appMainColor}>
        <Path d="M11.47 22c-3.992 0-5.989 0-7.23-1.172C3 19.657 3 17.771 3 14v-4c0-3.771 0-5.657 1.24-6.828C5.481 2 7.478 2 11.47 2h1.06c3.993 0 5.989 0 7.23 1.172C21 4.343 21 6.229 21 10m-9.5 12H13M8 7h8m-8 5h5" />
        <Path d="m17.5 18.59l-.902 3.153a.2.2 0 0 0 .268.235l1.985-.793a.4.4 0 0 1 .298 0l2.004.8a.2.2 0 0 0 .27-.226l-.764-3.268M22 15.995A3 3 0 0 0 19 13c-1.657 0-3 1.341-3 2.995a2.997 2.997 0 0 0 3 2.995c1.657 0 3-1.34 3-2.995" />
      </G>
    </Svg>
  );
};
