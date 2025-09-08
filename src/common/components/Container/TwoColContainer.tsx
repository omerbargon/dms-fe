import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface ITwoColContainerProps extends ViewProps {
  firstCol: React.ReactNode;
  secondCol: React.ReactNode;
}

export const TwoColContainer = ({ firstCol, secondCol, style }: ITwoColContainerProps) => {
  const styles = createStyles();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.item}>{firstCol}</View>
      <View style={styles.item}>{secondCol}</View>
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
    },
    item: {
      width: '100%',
      flex: 1,
    },
  });
