import { StyleSheet } from 'react-native';
import { Palette, scaleHeight, scaleWidth, scaledSize } from '@src/utils';

export const newsListStyles = (palette: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.backgroundColor,
    },
    listContent: {
      paddingHorizontal: scaleWidth(16),
      paddingVertical: scaleHeight(12),
    },
    itemContainer: {
      marginBottom: scaleHeight(12),
      // Using your utilities for consistent spacing
      padding: scaleWidth(12),
      borderRadius: scaleWidth(8),
      backgroundColor: palette.backgroundColor || '#ffffff', 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: scaledSize(16),
      fontWeight: '700',
      color: palette.textColor,
      marginBottom: scaleHeight(4),
    },
    description: {
      fontSize: scaledSize(14),
      color: palette.textColor,
      lineHeight: scaleHeight(20),
    },
    footerLoader: {
      marginVertical: scaleHeight(20),
      alignItems: 'center',
    },
  });