# Code Guide

> Quick reference for patterns used in this project.
> Read before adding new features.

---

## Index
- [Storage](#storage)
- [Theme](#theme)
- [Language](#language)
- [Translations](#translations)
- [Global Loader](#global-loader)
- [App Context](#app-context)
- [App Bootstrap](#app-bootstrap)
- [Navigation](#navigation)

---

## Storage

Two ways to use storage in this project:

**Zustand Persist Bridge** — automatic, used internally by stores
```typescript
// zustandStorage is passed to persist() middleware — do not use directly
storage: createJSONStorage(() => zustandStorage)
```

**Manual Helpers** — use when reading/writing outside of Zustand
```typescript
import { storage } from '@src/store';
import { STORAGES_KEY } from '@src/constants';

storage.setData(STORAGES_KEY.TOKEN, value)  // write
storage.getData<TokenType>(STORAGES_KEY.TOKEN) // read
storage.delete(STORAGES_KEY.TOKEN)           // delete one
storage.clearAll()                           // wipe everything (logout)
```

> Related files: `store/storage.ts`

---

## Theme

Persisted to MMKV. Survives app restart.

```typescript
// Read
const { color, appTheme } = useAppContext()
color.primary        // use color tokens — never hardcode hex
color.backgroundColor

// Change theme
const { setAppTheme } = useAppContext()
setAppTheme('dark')
setAppTheme('light')
```

**Adding a new theme:**
1. Add palette to `APP_COLORS` in `utils/themeConfig.ts`
2. Add key to `ThemeKey` type
3. `setAppTheme('yourNewKey')` — `resolvePalette` handles the rest

> `onRehydrateStorage` recalculates `colors` from `theme` on app restart —
> ensures palette is always in sync even if `APP_COLORS` changes between app versions.

> Related files: `store/useThemeStore.ts` · `utils/themeConfig.ts`

---

## Language

Persisted to MMKV. Synced with i18n on hydration.

```typescript
// Read
const { language } = useAppContext()

// Change language
const { setLanguage } = useAppContext()
setLanguage(Language.Hindi)
setLanguage(Language.English)

// Outside component
import { getCurrentLanguage } from '@src/store/useLanguageStore'
getCurrentLanguage() // returns current Language enum value

// Check hydration before showing app (in App.tsx)
const hasHydrated = useLanguageStore.persist.hasHydrated()
if (!hasHydrated) return null // or splash screen
```

**Adding a new language:**
1. Add `xx.json` to `i18n/locales/`
2. Register in `i18n/index.ts` resources
3. Add enum value to `Language` in `useLanguageStore.ts`
4. Add enum value to `ContentLanguage` in `i18n/index.ts`

> `onRehydrateStorage` calls `i18n.changeLanguage()` on app restart —
> ensures i18n and store are always in sync.

> Related files: `store/useLanguageStore.ts` · `i18n/index.ts`

---

## Translations

Use `contents()` to translate strings anywhere — inside or outside components.
Keys are strictly typed from `en.json` — wrong keys fail at compile time.

```typescript
import { contents } from '@src/utils'

// Simple
contents('login.title')                          // → "Log In"

// With interpolation (en.json: "welcome": "Hello, {{name}}!")
contents('home.welcome', { name: 'John' })       // → "Hello, John!"

// Plural (en.json: "items": "{{count}} item" / "{{count}} items")
contents('cart.items', { count: 3 })             // → "3 items"
```

> ⚠️ **Always** consume `language` in your viewmodel/hook so the component re-renders on language change:
> ```typescript
> // useYourScreen.ts — add this even if you don't use language directly
> const { color, language } = useAppContext() // language subscription triggers re-render
> ```
> Without this, `contents()` runs once on mount and never updates when language changes.
> Outside React, `contents()` still works but won't auto re-render on language change.

> Related files: `utils/contents.ts` · `i18n/index.ts` · `i18n/locales/en.json`

---

## Global Loader

Two sources control the loader — both feed into `AppLoader`:

```typescript
// Auto — React Query controls show/hide via meta flag
useMutation({ meta: { showGlobalLoader: true } })
useQuery({ meta: { showGlobalLoader: true } })

// Manual — for direct calls outside React Query
import { uiActions } from '@src/store/useUIStore'
uiActions.show()
try { await someService.directCall() }
finally { uiActions.hide() } // always in finally — never skip hide
```

> Related files: `store/useUIStore.ts` · `hooks/ui/useLoadingRegistry.ts` · `AppLoader.tsx`

---

## App Context

Single hook to access theme, language, and navigation anywhere.
Use this instead of importing each store separately.

```typescript
const {
  color,          // Palette — color tokens
  appTheme,       // 'light' | 'dark' | ThemeKey
  setAppTheme,    // change theme
  language,       // Language enum
  setLanguage,    // change language
  navigation,     // typed navigation object
} = useAppContext()
```

> Related files: `hooks/ui/useAppContext.ts`

---

## App Bootstrap

Runs once on app mount. Handles localization init and splash screen fade.
Determines initial route based on auth state.

```typescript
// In App.tsx / RootNavigator.tsx
const { isAppReady, showSplash, splashOpacity, initialRoute } = useAppBootstrap()

if (!isAppReady) return null

// initialRoute defaults to Screen.LOGIN
// extend determineInitialRoute() to check auth token for auto-login
```

**To add more bootstrap steps** (fonts, permissions, etc.):
Add async logic inside `runBootstrapSequence()` in `useAppBootstrap.ts`

> Related files: `hooks/ui/useAppBootstrap.ts`

---

## Navigation

Use `useAppNavigation` instead of `useNavigation` — it is pre-typed.

```typescript
// ✅ typed navigation
const navigation = useAppNavigation()
navigation.navigate(Screen.LOGIN)

// or via useAppContext
const { navigation } = useAppContext()
navigation.navigate(Screen.HOME)

// Outside React (interceptors, services)
import { reset } from '@src/utils/navigationRef'
reset(Screen.LOGIN)
```

> Related files: `hooks/ui/useAppNavigation.ts` · `utils/navigationRef.ts` · `navigation/screen.ts`