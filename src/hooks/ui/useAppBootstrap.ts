// src/hooks/ui/useAppBootstrap.ts
import { useState, useEffect, useRef, useEffectEvent } from 'react';
import { Animated } from 'react-native';
import { Screen } from '@src/navigation/screen';
import { initLocalization } from '@src/i18n';
import { useLanguageStore } from '@src/store/useLanguageStore';

export interface AppBootstrapResult {
  isAppReady: boolean;
  showSplash: boolean;
  splashOpacity: Animated.Value;
  initialRoute: Screen;
}

export const useAppBootstrap = (): AppBootstrapResult => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;

  // 1. Isolate the "Business Logic" of bootstrapping
  // This stays fresh and can access any latest state/props
  const runBootstrapSequence = useEffectEvent(async () => {
      // Logic checks (Localization, fonts, permissions, etc.)
      const savedLanguage = useLanguageStore.getState().language;
      await initLocalization(savedLanguage);

      // Mark app as ready
      setIsAppReady(true);

      // Fade out animation
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
  });

  useEffect(() => {
    // 2. The Effect is purely a "Mount Trigger"
    // It calls the event, but doesn't list it as a dependency
    runBootstrapSequence();
  }, []); // ✅ Strictly runs once on mount, regardless of logic changes above

  // Route Logic - Determine initial screen based on auth state
  const determineInitialRoute = (): Screen => {
    // Default to Login
    return Screen.LOGIN;
  };

  const initialRoute = determineInitialRoute();

  return {
    isAppReady,
    showSplash,
    splashOpacity,
    initialRoute
  };
};
