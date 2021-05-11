import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import { DatabaseConnectionProvider } from "./database/connection";
import SchemaScreen from "./screens/SchemaScreen";

const Stack = createStackNavigator();

const App: React.FC = () => (
  <DatabaseConnectionProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schema" component={SchemaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </DatabaseConnectionProvider>
);

export default App;
