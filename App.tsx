import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { DatabaseConnectionProvider } from "./src/database/connection";
import MainNavigator from "./src/navigation/MainNavigator";

const App: React.FC = () => {
  return (
    <DatabaseConnectionProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </DatabaseConnectionProvider>
  );
};

export default App;
