import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import MainNavigator from "./src/navigation/MainNavigator";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
