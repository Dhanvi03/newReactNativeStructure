# Project Directory Structure

This guide explains the purpose of each directory in the `src` folder of this React Native project.

## Core Directories

- **`assets/`**: Contains static files like images, fonts, icons, and SVG icons. Asset index files are automatically updated.
- **`blueprints/`**: Core base components (Atoms) used throughout the application (e.g., `AppText`, `Button`). These should be as generic as possible.
- **`components/`**: Feature-specific or reusable complex components (Molecules/Organisms) built using blueprints (e.g., `AppTextInput`, `BaseLayout`).
- **`constants/`**: Application constants, environment configurations, and static data.
- **`context/`**: React Context providers and consumers for global state like internationalization or loaders.
- **`hooks/`**: Custom React hooks for global logic, API interactions, and UI-independent behavior.
- **`i18n/`**: Internationalization setup and translation files.
- **`navigation/`**: Navigation configuration, screen enums, and navigators (e.g., `RootNavigator`, `MainTabNavigator`).
- **`screens/`**: High-level screen components. Logic should be separated into a local `use[ScreenName]` hook within each screen folder.
- **`services/`**: API handlers and domain-specific logic. 
    - `api/`: Client configuration and generic handlers.
    - `domains/`: Domain-specific API calls (e.g., `news`, `auth`).
- **`store/`**: Zustand stores for state management (e.g., `useThemeStore`, `useNewsStore`).
- **`types/`**: TypeScript interfaces and types used across the project.
- **`utils/`**: Helper functions and utility classes.

## Development Workflow

- Logic for a screen should live in its own custom hook within the screen's directory.
- Prefer `blueprints` for basic UI elements and `components` for assembled UI.
- Use `Screen` enum for all navigation actions to ensure type safety.
