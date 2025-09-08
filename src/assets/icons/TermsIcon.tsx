import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const TermsIcon = () => {
  const { theme } = useTheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32">
      <Path fill={theme.black} d="M10 16h12v2H10zm0-6h12v2H10z" />
      <Path fill={theme.black} d="m16 30l-6.176-3.293A10.98 10.98 0 0 1 4 17V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v13a10.98 10.98 0 0 1-5.824 9.707ZM6 4v13a8.99 8.99 0 0 0 4.766 7.942L16 27.733l5.234-2.79A8.99 8.99 0 0 0 26 17V4Z" />
    </Svg>
  );
};
