import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const PaymentIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();

  return (
    <Svg width="32" height="32" viewBox="0 0 48 48">
      <Path
        fill={!focused ? theme.black : theme.appMainColor}
        d="M4 15.25A6.25 6.25 0 0 1 10.25 9h27.5A6.25 6.25 0 0 1 44 15.25v17.5A6.25 6.25 0 0 1 37.75 39h-27.5A6.25 6.25 0 0 1 4 32.75zm6.25-3.75a3.75 3.75 0 0 0-3.75 3.75v3.25h35v-3.25a3.75 3.75 0 0 0-3.75-3.75zM6.5 32.75a3.75 3.75 0 0 0 3.75 3.75h27.5a3.75 3.75 0 0 0 3.75-3.75V21h-35zm24.75-3.25a1.25 1.25 0 1 0 0 2.5h5.5a1.25 1.25 0 1 0 0-2.5z"
      />
    </Svg>
  );
};
