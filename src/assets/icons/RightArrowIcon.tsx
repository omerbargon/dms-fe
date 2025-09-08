import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const RightArrowIcon = () => {
  const { theme } = useTheme();
  return (
    <Svg width="18" height="18" viewBox="0 0 1024 1024">
      <Path
        fill={theme.black}
        d="M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
        strokeWidth="25.5"
        stroke={theme.black}
      />
    </Svg>
  );
};
