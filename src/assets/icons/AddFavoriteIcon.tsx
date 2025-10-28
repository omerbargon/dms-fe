import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const AddFavoriteIcon = () => {
  const { theme } = useTheme();
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={theme.black}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m14.479 19.374l-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49M15 15h6m-3-3v6"
      />
    </Svg>
  );
};
