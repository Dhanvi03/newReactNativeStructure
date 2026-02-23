import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './navigation.types';
import { useAppContext } from '@src/hooks';
import NewsListScreen from '@src/screens/NewsList/NewsListScreen';

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
    <Tab.Navigator
      screenOptions={screenOptions}
      children={
        <Tab.Screen
          name="Home"
          component={NewsListScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
      }
    />
  );
};

export default MainTabNavigator;
