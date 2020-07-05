import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Activity_Home from "./src/view/Activity_Home";
import Activity_Detail from "./src/view/Activity_Detail";
import Activity_Info from "./src/view/Activity_Info";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Activity_Home} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerTintColor: "#000", headerTitle: false, headerTransparent: true }} name="Detail" component={Activity_Detail} />
        <Stack.Screen options={{ headerTintColor: "#000", headerTitle: "Help", headerTransparent: true }} name="Info" component={Activity_Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
