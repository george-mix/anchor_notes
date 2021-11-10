import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NoteScreen from "../screens/NoteScreen";
import CollectionScreen from "../screens/CollectionScreen";
import TreeScreen from "../screens/TreeScreen";

export const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Collections" component={CollectionScreen} />
      <Stack.Screen name="Tree" component={TreeScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
