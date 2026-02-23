import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

interface ButtonProps {
  title: string;
  onPress: () => void;
  palette: Palette; // Pass the active theme palette here
  loading?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'ghost';
  buttonContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  title,
  onPress,
  palette,  
  loading = false,
  disabled = false,
  variant = 'filled',
  buttonContainerStyle,
  textStyle,
}) => {
  const isGhost = variant === 'ghost';

  // Memoize styles so they only recalculate if the theme changes
  const styles = useMemo(() => buttonStyles(palette), [palette]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        isGhost ? styles.ghostContainer : styles.filledContainer,
        (disabled || loading) && styles.disabled,
        buttonContainerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost ? palette.primary : palette.backgroundColor} />
      ) : (
        <Text
          style={[
            styles.text,
            isGhost ? styles.ghostText : styles.filledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
});
const buttonStyles = (palette: Palette) =>
  StyleSheet.create({
    container: {
      height: scaleHeight(48),
      borderRadius: scaleWidth(12),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: scaleWidth(16),
    },
    filledContainer: {
      backgroundColor: palette.primary,
    },
    ghostContainer: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: palette.primary,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      fontSize: scaledSize(16),
      // Use your specific FontFamily here if defined in utils
      fontWeight: '600',
    },
    filledText: {
      color: palette.backgroundColor, // High contrast against primary
    },
    ghostText: {
      color: palette.primary,
    },
  });