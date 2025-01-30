import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { StudioScreen } from '../screens/StudioScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen 
        name="Studio" 
        component={StudioScreen}
        options={{
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};