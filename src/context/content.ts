import { TOptions } from 'i18next';
import i18n, { TxKeyPath } from '../i18n';

/**
 * Translates text using the global i18next instance.
 * * @param key - The strictly typed i18n key path (e.g., 'login.title').
 * @param options - Optional i18next TOptions for interpolation or plurals.
 * @returns The translated string.
 *
 * @example
 * // Simple usage:
 * contents('login.log_in') 
 * // => "Log In"
 * * @example
 * // With interpolation (if en.json has "welcome": "Hello, {{name}}!"):
 * contents('home.welcome', { name: 'John' }) 
 * // => "Hello, John!"
 * * @note 
 * Use this inside components that consume `useAppContext` or `useLanguage` 
 * to ensure the component re-renders when the language changes.
 */
export const contents = (key: TxKeyPath, options?: TOptions): string => {
  // We cast key as any because our custom TxKeyPath type is 
  // more descriptive than the default i18next string type.
  return i18n.t(key as any, options);
};