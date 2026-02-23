// src/navigation/screen.ts
/**
 * Centralized screen name definitions using enum
 * Benefits:
 * - Type-safe screen names everywhere
 * - Easy to refactor
 * - Single source of truth
 * - Autocomplete in IDE
 */

export enum Screen {
  // Auth Screens
  LOGIN = 'Login',
  ONBOARDING = 'Onboarding',
  SIGNUP = 'Signup',
  FORGOT_PASSWORD = 'ForgotPassword',

  // App Screens
  BOTTOM_TAB = 'BottomTab',
  EDIT_PROFILE = 'EditProfile',
  NEWS_LIST = 'NewsList',
  NOTIFICATION = 'Notification',

  ACTIVITY_EXAMPLE = 'ActivityExample',
}

// Export all screen names as a type
export type ScreenName = keyof typeof Screen;
