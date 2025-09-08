import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITheme, useTheme } from '../../../../src/theme';

interface IFormReadOnlyProps {
  label: string;
  value?: string | number | boolean;
}

export const FormReadOnly = React.memo(({ label, value }: IFormReadOnlyProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ? String(value) : '—'}</Text>
    </View>
  );
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    label: {
      fontWeight: '600',
      fontSize: 15,
      color: theme.black,
      marginBottom: 2,
    },
    value: {
      fontSize: 14,
      color: theme.black,
    },
  });
