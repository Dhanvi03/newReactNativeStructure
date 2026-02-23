// src/hooks/useAppContext.ts
import { useThemeStore } from '../../store/useThemeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAppNavigation } from './useAppNavigation';

/**
 * A "master" hook to access common app-wide utilities like
 * themes, language, and navigation.
 */
export const useAppContext = () => {
  const { theme, colors, setTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const navigation = useAppNavigation();

  return {
    // Theme properties
    appTheme: theme,
    setAppTheme: setTheme,
    color: colors,

    // Language properties
    language,
    setLanguage,

    // Navigation
    navigation,
  };
};