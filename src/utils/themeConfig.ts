// src/utils/themeConfig.ts
import { ColorSchemeName } from 'react-native';

export const APP_COLORS = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    primary: '#007AFF',
  },
  // If a project doesn't have Dark Mode, just point it to the light object
  dark: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    primary: '#0a84ff',
  },
  // Add as many or as few as you want
  // theme1: { ... }
};

export type Palette = typeof APP_COLORS['light'];
export type ThemeKey = keyof typeof APP_COLORS;

// This type handles System preferences AND your custom keys
export type ThemePreference = ColorSchemeName | ThemeKey;