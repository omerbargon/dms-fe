import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, TextProps, ViewStyle, TextStyle, View } from 'react-native';
import { ITheme, useTheme } from '../../../../src/theme';

interface ButtonProps extends PressableProps {
  title: React.ReactNode;
  header?: React.ReactNode;
  textStyle?: TextStyle & TextProps;
  style?: ViewStyle;
  variant?: 'filled' | 'outlined';
  color?: string;
  prefix?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ title, header, disabled, textStyle, style, variant = 'filled', color, prefix, ...rest }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, variant, color);

  return (
    <View style={style}>
      {header && <View style={styles.headerContainer}>{header}</View>}
      <Pressable disabled={disabled} style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && { opacity: 0.7 }]} {...rest}>
        <View style={styles.rowContainer}>
          {prefix}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: ITheme, variant: 'filled' | 'outlined', color?: string) => {
  const buttonColor = color || theme.appMainColor;

  return StyleSheet.create({
    button: {
      backgroundColor: variant === 'filled' ? buttonColor : 'transparent',
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: buttonColor,
    },
    rowContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    disabled: {
      opacity: 0.6,
    },
    text: {
      color: variant === 'filled' ? 'white' : buttonColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerContainer: {
      marginBottom: 6,
    },
  });
};
