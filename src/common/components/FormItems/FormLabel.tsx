import { ITheme, useTheme } from '../../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ILabelProps {
  label?: string;
  required?: boolean;
}

export const FormLabel = React.memo(({ label, required }: ILabelProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.danger}> *</Text>}
      </Text>
    </View>
  );
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 4,
    },
    label: {
      color: theme.black,
      fontSize: 16,
      fontWeight: '600',
    },
    danger: {
      color: theme.danger,
    },
  });
