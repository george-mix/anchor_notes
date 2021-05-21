import React from "react";
import { Text, View } from "react-native";

import CollectionList from "../components/CollectionList";
import { TestFunction } from "../components/MonolitTest";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CollectionList />
      <View>
        <Text>Hello</Text>
        <TestFunction />
      </View>
    </View>
  );
};

export default HomeScreen;
