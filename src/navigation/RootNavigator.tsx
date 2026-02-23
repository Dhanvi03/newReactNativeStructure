// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation.types';
import { Screen } from './screen';

// Import all screens
import LoginScreen from '@src/screens/Login/LoginScreen';
import { MainTabNavigator } from './MainTabNavigator';
import ActivityExampleScreen from '@src/screens/ActivityExampleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  initialRouteName: Screen;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({ initialRouteName }) => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.ACTIVITY_EXAMPLE}
      screenOptions={{
        headerShown: false
      }}
      children={
        <>
          {/* ===== AUTH SCREENS ===== */}
          <Stack.Screen
            name={Screen.LOGIN}
            component={LoginScreen}
          />
          <Stack.Screen
            name={Screen.ACTIVITY_EXAMPLE}
            component={ActivityExampleScreen}
          />

          {/* ===== APP SCREENS ===== */}
          <Stack.Screen
            name={Screen.BOTTOM_TAB}
            component={MainTabNavigator}
          />
        </>
      }
    />
  );
};

export default RootNavigator;
