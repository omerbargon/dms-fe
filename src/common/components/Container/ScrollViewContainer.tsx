import { ITheme, useTheme } from '../../../theme';
import React, { useMemo } from 'react';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const ScrollViewContainer = ({ children, style }: IProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView contentContainerStyle={[styles.container, style]} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: theme.white,
      flexGrow: 1,
    },
  });
