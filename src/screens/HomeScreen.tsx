import React from "react";
import { View } from "react-native";

import CollectionList from "../components/CollectionList";
import TestTree from "../components/TestTree";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CollectionList />
      <TestTree />
    </View>
  );
};

export default HomeScreen;
