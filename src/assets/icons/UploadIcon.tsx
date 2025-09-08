import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from '../../../src/theme';

export const UploadIcon = () => {
  const { theme } = useTheme();

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <G fill="none" stroke={theme.appSecondaryColor} strokeLinecap="round" strokeWidth="1.5">
        <Path
          strokeLinejoin="round"
          d="M4.382 8.813v8.5c0 .845.344 1.656.957 2.253a3.3 3.3 0 0 0 2.308.934h8.706c.866 0 1.696-.336 2.308-.934a3.15 3.15 0 0 0 .957-2.253v-8.5m0-5.313H4.382c-.901 0-1.632.714-1.632 1.594v2.125c0 .88.73 1.593 1.632 1.593h15.236c.901 0 1.632-.713 1.632-1.593V5.094c0-.88-.73-1.594-1.632-1.594"
        />
        <Path strokeMiterlimit="10" d="M12 12v5" />
        <Path strokeLinejoin="round" d="m14.293 14.105l-1.967-1.967a.46.46 0 0 0-.652 0l-1.967 1.967" />
      </G>
    </Svg>
  );
};
