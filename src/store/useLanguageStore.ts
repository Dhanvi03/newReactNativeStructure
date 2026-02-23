// src/store/useLanguageStore.ts

//useage
// const language = useLanguageStore((state) => state.language);
// const setLanguage = useLanguageStore((state) => state.setLanguage);


//In your App.tsx (the root of your project), you can ensure everything is hydrated before showing the app.
// const hasHydrated = useLanguageStore.persist.hasHydrated();

//   if (!hasHydrated) {
//     return null; // Or your Splash Screen
//   }
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';
import i18n from '@src/i18n';

export enum Language {
  English = 'en',
  Hindi = 'hi',
}

interface LanguageState {
  // State
  language: Language;

  // Actions
  setLanguage: (lang: Language) => Promise<void>;
}

/**
 * Language Store
 *
 * Manages:
 * - Current language selection
 * - i18n synchronization
 * - Language persistence
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      // Initial state
      language: (i18n.language as Language) || Language.English,

      // Change language
      setLanguage: async (lang: Language) => {
        // Update i18n
        await i18n.changeLanguage(lang);
        // Update store
        set({ language: lang });
      },
    }),
    {
      name: 'app-language',
      storage: createJSONStorage(() => zustandStorage),
      // Sync i18n when store is hydrated from storage
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);

/**
 * Utility: Get current language (outside component)
 */
export const getCurrentLanguage = () => {
  return useLanguageStore.getState().language;
};