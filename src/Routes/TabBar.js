import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../Routes/HomeStack";
import AccountStack from "../Routes/AccountStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "eLearning") {
            iconName = focused ? "laptop" : "laptop-outline";
          } else if (route.name === "Account") {
            iconName = !focused ? "person-outline" : "person";
          } else if (route.name === "Courses") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }
          return <Ionicons name={iconName} size={15} color={"#F44336"} />;
        },
        tabBarActiveTintColor: "#F44336",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name={"eLearning"} component={HomeStack} />
      <Tab.Screen name={"Account"} component={AccountStack} />
    </Tab.Navigator>
  );
}
