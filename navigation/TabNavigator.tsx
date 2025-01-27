import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Screens
import Studio from "screens/Studio";
import Learn from "screens/Learn";
import MarketPlace from "screens/MarketPlace";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
            <Tab.Navigator 
                id={undefined}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: any;

                        if (route.name === "Studio") {
                            iconName = "musical-notes";
                        } else if (route.name === "Learn") {
                            iconName = "book";
                        } else if (route.name === "MarketPlace") {
                            iconName = "cart";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#60A5FA",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#1e293b",
                        borderTopWidth: 1,
                        borderTopColor: "#1e293b",
                    }
                })}
            >
                <Tab.Screen 
                name="Studio" 
                component={Studio}
                options={{
                    title: "Studio",
                    headerShown: false
                }} 
                />
                <Tab.Screen 
                name="Learn" 
                component={Learn} 
                options={{
                    title: "Learn",
                    headerShown: false
                }}
                />
                <Tab.Screen 
                name="MarketPlace" 
                component={MarketPlace}
                options={{
                    title: "MarketPlace",
                    headerShown: false
                }} 
                />
            </Tab.Navigator>
    );
}
