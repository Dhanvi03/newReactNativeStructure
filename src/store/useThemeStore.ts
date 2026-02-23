// src/store/useThemeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { APP_COLORS, Palette, ThemePreference, ThemeKey } from '@src/utils';
import { zustandStorage } from './storage';

interface ThemeState {
  theme: ThemePreference;
  colors: Palette;
  setTheme: (t: ThemePreference) => void;
}

// Logic to pick a palette regardless of what project we are in
const resolvePalette = (pref: ThemePreference): Palette => {
  // 1. If pref is a valid key in our config, use it
  if (pref && pref in APP_COLORS) {
    return APP_COLORS[pref as ThemeKey];
  }
  // 2. Default Fallback (Every app has 'light')
  return APP_COLORS.light;
};


export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      colors: APP_COLORS.light,
      
      setTheme: (newTheme: ThemePreference) => {
        set({
          theme: newTheme,
          colors: resolvePalette(newTheme),
        });
      },
    }),
    {
      name: 'app-theme-storage',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.colors = resolvePalette(state.theme);
      },
    }
  )
);