import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../theme';

export const EnvelopIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <G fill="none" stroke={theme.appMainColor} strokeWidth="1.5">
        <Rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
        <Path strokeLinecap="round" strokeLinejoin="round" d="m2.729 7.59l7.205 4.13a3.96 3.96 0 0 0 3.975 0l7.225-4.13" />
      </G>
    </Svg>
  );
};
