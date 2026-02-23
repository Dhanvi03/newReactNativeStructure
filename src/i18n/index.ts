import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import hi from './locales/hi.json';
import enJson from './locales/en.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
} as const;

// Make i18next aware of the shape of our resources so `t()` and `useTranslation()` are typed
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof enJson;
    };
  }
}

export enum ContentLanguage {
  English = 'en',
  Hindi = 'hi',
}

export type TxKeyPath = RecursiveKeyOf<typeof en>;

const getInitialLanguage = (): string => {
  const fallback = { languageTag: 'en' };
  try {
    const best = RNLocalize.findBestLanguageTag(Object.keys(resources));
    return best?.languageTag || fallback.languageTag;
  } catch {
    return fallback.languageTag;
  }
};

export const initLocalization = async (savedLanguage?: string) => {
  const available = Object.keys(resources);
  const normalize = (s?: string) => (typeof s === 'string' ? s.split('-')[0] : undefined);

  const candidate = normalize(savedLanguage);
  const lng = candidate && available.includes(candidate) ? candidate : getInitialLanguage();

  await i18n.use(initReactI18next).init({
    resources: resources as any,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
};

export const changeLanguage = async (langCode: string) => {
  await i18n.changeLanguage(langCode);
};

export const locale = getInitialLanguage();

export default i18n;

// Generate nested dot/bracket keys for editor autocomplete (based on en.json)
// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
