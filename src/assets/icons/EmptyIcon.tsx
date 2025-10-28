import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export const EmptyIcon = () => {
  return (
    <Svg width="64" height="64" viewBox="0 0 24 24">
      <G fill="none">
        <Path fill="#8fbffa" d="m1.184 9.5l3.056 11h15.52l3.056-11z" />
        <Path fill="#2859c5" fill-rule="evenodd" d="M6 22.5a3 3 0 1 0 0-6a3 3 0 0 0 0 6m12 0a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clip-rule="evenodd" />
        <Path fill="#2859c5" d="M3.5 7.5v2h17v-2l-6-4.5l-4 3l-3-1.5z" />
      </G>
    </Svg>
  );
};
