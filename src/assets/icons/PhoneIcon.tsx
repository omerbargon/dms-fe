import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const PhoneIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={theme.black}
        d="m17.707 13.707l2.648 2.648a.91.91 0 0 1 0 1.29a5.47 5.47 0 0 1-7.151.508l-1.575-1.182a23 23 0 0 1-4.6-4.6l-1.182-1.575a5.47 5.47 0 0 1 .508-7.151a.91.91 0 0 1 1.29 0l2.648 2.648a1 1 0 0 1 0 1.414L9.272 8.728a.53.53 0 0 0-.1.616a12.26 12.26 0 0 0 5.484 5.484a.53.53 0 0 0 .616-.1l1.02-1.02a1 1 0 0 1 1.415 0Z"
        strokeWidth="1.35"
      />
    </Svg>
  );
};
