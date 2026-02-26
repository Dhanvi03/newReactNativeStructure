import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Screen } from './screen';

// ─── Bottom Tab Params ────────────────────────────────────────────
export type BottomTabParamList = {
  Home: undefined;
  SOSContacts: undefined;
  Settings: undefined;
};

// ─── Root Stack Params ────────────────────────────────────────────
export type RootStackParamList = {
  [Screen.LOGIN]: undefined;
  [Screen.ONBOARDING]: undefined;
  [Screen.SIGNUP]: undefined;
  [Screen.FORGOT_PASSWORD]: undefined;
  [Screen.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamList>;
  [Screen.EDIT_PROFILE]: undefined;
  [Screen.NOTIFICATION]: { notificationData?: any } | undefined;
  [Screen.PRODUCT_LIST]: { id: string };
};

// ─── Screen Props ─────────────────────────────────────────────────

// Root stack screen — Usage: FC<RootStackScreenProps<Screen.LOGIN>>
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Bottom tab screen — has access to both tab + root stack navigation
// Usage: FC<BottomTabScreenProps<'Home'>>
export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    RNBottomTabScreenProps<BottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;