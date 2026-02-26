import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './navigation.types';
import { useAppContext } from '@src/hooks';
import { AppText } from '@src/blueprints';
import ProductListScreen from '@src/screens/Product/ProductListScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const MainTabNavigator = () => {
  const { color } = useAppContext();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: color.primary,
    tabBarInactiveTintColor: color.textColor,
    tabBarStyle: {
      backgroundColor: color.backgroundColor,
      borderTopWidth: 1,
      height: 60,
      paddingBottom: 10,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={ProductListScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <AppText style={{ color, fontSize: 12 }}>Home</AppText>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;