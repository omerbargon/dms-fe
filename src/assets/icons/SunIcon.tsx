import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export const SunIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <G fill="none">
        <G clipPath="url(#siLightModeLine0)">
          <Path
            stroke={theme.black}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            d="M5 12H1m22 0h-4M7.05 7.05L4.222 4.222m15.556 15.556L16.95 16.95m-9.9 0l-2.828 2.828M19.778 4.222L16.95 7.05M12 19v4m0-22v4m4 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0"
          />
        </G>
        <Defs>
          <ClipPath id="siLightModeLine0">
            <Path fill={theme.white} d="M0 0h24v24H0z" />
          </ClipPath>
        </Defs>
      </G>
    </Svg>
  );
};
