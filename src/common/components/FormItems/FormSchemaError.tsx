import { ITheme, useTheme } from '../../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface ISchemaError {
  errorMessage: React.ReactNode;
}

export const FormSchemaError = React.memo(({ errorMessage }: ISchemaError) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <Text style={styles.errorMessage}>{errorMessage}</Text>;
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    errorMessage: {
      color: theme.danger,
      fontSize: 14,
      marginBottom: 4,
      fontWeight: '600',
    },
  });
