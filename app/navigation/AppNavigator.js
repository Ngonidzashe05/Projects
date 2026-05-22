import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import MapScreen from "../screens/MapScreen";
import MyPinsScreen from "../screens/MyPinsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const icons = {
              Map: "🗺️",
              "My Pins": "📍",
              Profile: "👤",
            };
            return <Text style={{ fontSize: focused ? 24 : 20 }}>{icons[route.name]}</Text>;
          },
          tabBarActiveTintColor: "#4DB6AC",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="My Pins" component={MyPinsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}