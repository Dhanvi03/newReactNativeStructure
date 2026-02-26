// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation.types';
import { Screen } from './screen';

// Import all screens
import LoginScreen from '@src/screens/Login/LoginScreen';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  initialRouteName: keyof typeof Screen;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({ initialRouteName }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Screen.BOTTOM_TAB} component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
