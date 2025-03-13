// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import "./src/styles/global.css"

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer>
      <TabNavigator />
      </NavigationContainer>
    </>
  );
}