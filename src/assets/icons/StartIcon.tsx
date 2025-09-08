import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

export const StartIcon = () => {
  return (
    <Svg width="26" height="26" viewBox="0 0 24 24">
      <G fill="none" stroke="#fff" strokeWidth="1.5">
        <Circle cx="12" cy="13" r="9" />
        <Path strokeLinecap="round" d="M10 2h4" />
        <Path d="M13.888 10.935C14.963 11.812 15.5 12.25 15.5 13s-.537 1.188-1.612 2.065c-.297.242-.591.47-.862.66c-.237.167-.506.339-.784.508c-1.073.652-1.609.978-2.09.617c-.48-.36-.524-1.116-.612-2.628c-.024-.427-.04-.846-.04-1.222s.016-.795.04-1.222c.088-1.512.132-2.267.612-2.628c.481-.361 1.018-.035 2.09.617c.278.169.547.341.784.508c.27.19.565.418.862.66Z" />
      </G>
    </Svg>
  );
};
