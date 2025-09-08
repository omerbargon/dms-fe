import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const ArrowDownIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="10" height="10" viewBox="0 0 24 24">
      <Path fill={theme.black} d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z" />
    </Svg>
  );
};
