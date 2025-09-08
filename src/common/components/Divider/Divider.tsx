import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../src/theme';

interface DividerProps {
  text?: string;
  noSpace?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  const { theme } = useTheme();
  const hasText = Boolean(text);

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: theme.borderColor }]} />
      {hasText && <Text style={[styles.text, { color: theme.placeholder }]}>{text}</Text>}
      {hasText && <View style={[styles.line, { backgroundColor: theme.borderColor }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 8,
    fontWeight: '500',
  },
  line: {
    flex: 1,
    height: 1,
  },
});
