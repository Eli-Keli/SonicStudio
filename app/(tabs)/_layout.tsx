import React from 'react';

// Icons
import { Ionicons } from "@expo/vector-icons";

// Expo Router
import { Tabs } from 'expo-router';

// Constants and helpers
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Components
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopWidth: 1,
            borderTopColor: colorScheme === "dark" ? "#1e293b" : "#e5e7eb",
            paddingTop: 5,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Studio',
            tabBarIcon: ({ color }) => <TabBarIcon name="musical-notes" color={color} />,
            header: () => <Header />,
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: 'Learn',
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
            header: () => <Header />,
          }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: 'Marketplace',
            tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
            header: () => <Header />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
