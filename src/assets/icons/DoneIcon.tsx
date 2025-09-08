import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const DoneIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="64" height="64" viewBox="0 0 1024 1024">
      <Path fill={theme.success} d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z" />
    </Svg>
  );
};
