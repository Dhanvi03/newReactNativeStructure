import React from 'react';
import { StyleProp, Text, TextProps, TextStyle, StyleSheet } from 'react-native';

export interface AppTextProps extends TextProps {
  children?: React.ReactNode;
  RTL?: boolean;
  style?: StyleProp<TextStyle>;
}

export const AppText = ({
  children,
  RTL = false,
  style,
  ...rest
}: AppTextProps) => {
  return (
    <Text
      allowFontScaling={true}
      style={[styles.base, { color: '#000000' }, RTL && styles.rtl, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    textAlign: 'left',
    fontSize: 16,
  },
  rtl: {
    textAlign: 'right',
  },
});