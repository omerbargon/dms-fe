import { useTheme } from '../../../../src/theme';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface ILoadingProps extends ActivityIndicatorProps {}

export const LoadingSplash = ({ ...rest }: ILoadingProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.appMainColor} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
