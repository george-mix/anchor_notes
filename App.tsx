import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";

import { DatabaseConnectionProvider } from "./src/database/connection";
import MainNavigator from "./src/navigation/MainNavigator";
import store from "./src/store/store";

const App: React.FC = () => {
  return (
    <DatabaseConnectionProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </DatabaseConnectionProvider>
  );
};

export default App;
