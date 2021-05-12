import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { DatabaseConnectionProvider } from "./database/connection";
import HomeScreen from "./screens/HomeScreen";
import SchemaScreen from "./screens/SchemaScreen";
import NoteScreen from "./screens/NoteScreen";

const Stack = createStackNavigator();

const App: React.FC = () => (
  <DatabaseConnectionProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schema" component={SchemaScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </DatabaseConnectionProvider>
);

export default App;
