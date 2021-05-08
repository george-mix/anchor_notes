import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import { DatabaseConnectionProvider } from "./database/connection";

const Stack = createStackNavigator();

const App: React.FC = () => (
  <DatabaseConnectionProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </DatabaseConnectionProvider>
);

export default App;
