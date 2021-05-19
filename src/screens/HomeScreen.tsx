import React from "react";
import { View } from "react-native";

import CollectionList from "../components/CollectionList";
import { TestFunction } from "../components/MonolitTest";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CollectionList />
      <TestFunction />
    </View>
  );
};

export default HomeScreen;
