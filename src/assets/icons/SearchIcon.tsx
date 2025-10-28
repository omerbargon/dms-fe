import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export const SearchIcon = () => {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24">
      <G fill="none" stroke="#9CA3AF" strokeWidth="1">
        <Circle cx="11" cy="11" r="5.5" />
        <Path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4" />
      </G>
    </Svg>
  );
};
