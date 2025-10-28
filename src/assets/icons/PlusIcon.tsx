import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

interface LikeIconProps {
  width?: number;
  height?: number;
}

export const PlusIcon: React.FC<LikeIconProps> = ({ width = 16, height = 16 }) => {
  const { theme } = useTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path fill={theme.appSecondaryColor} d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
    </Svg>
  );
};
