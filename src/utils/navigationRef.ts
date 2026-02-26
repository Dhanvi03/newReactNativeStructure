import { createNavigationContainerRef, StackActions, NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigation/navigation.types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// ─── Helper — params optional for undefined + nested navigators ───
type NavArgs<T extends keyof RootStackParamList> =
  RootStackParamList[T] extends undefined | void | NavigatorScreenParams<any>
    ? [name: T, params?: RootStackParamList[T]]
    : [name: T, params: RootStackParamList[T]];

// ─── Navigate ─────────────────────────────────────────────────────
export function navigate<T extends keyof RootStackParamList>(...args: NavArgs<T>) {
  const [name, params] = args;
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  }
}

// ─── Reset ────────────────────────────────────────────────────────
export function reset<T extends keyof RootStackParamList>(...args: NavArgs<T>) {
  const [name, params] = args;
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: name as any, params: params as any }],
    });
  }
}

// ─── Replace ──────────────────────────────────────────────────────
export function replace<T extends keyof RootStackParamList>(...args: NavArgs<T>) {
  const [name, params] = args;
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as any, params as any));
  }
}