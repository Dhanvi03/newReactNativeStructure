// src/navigation/navigation.types.ts
import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Screen } from './screen';

/**
 * BottomTab Screen Params
 */
export type BottomTabParamList = {
  Home: undefined;
  SOSContacts: undefined;
  Settings: undefined;
};

/**
 * Root Stack Params - Uses Screen enum
 * This is the source of truth for all navigation
 */
export type RootStackParamList = {
  [Screen.LOGIN]: undefined;
  [Screen.ONBOARDING]: undefined;
  [Screen.SIGNUP]: undefined;
  [Screen.FORGOT_PASSWORD]: undefined;
  [Screen.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamList>;
  [Screen.EDIT_PROFILE]: undefined;
  [Screen.NEWS_LIST]: undefined;
  [Screen.NOTIFICATION]: { notificationData?: any } | undefined;
  [Screen.ACTIVITY_EXAMPLE]: undefined;
};

/**
 * Props for Root Stack screens
 * Use: RootStackScreenProps<Screen.LOGIN>
 */
export type RootStackScreenProps<T extends Screen> = 
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Props for BottomTab screens
 * Provides access to both tab navigation AND root stack navigation
 */
export type BottomTabScreenProps<T extends keyof BottomTabParamList> = 
  CompositeScreenProps<
    RNBottomTabScreenProps<BottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
