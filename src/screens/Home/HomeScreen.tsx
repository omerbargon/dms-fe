import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleStyle}>Home Screen</Text>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.white,
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
