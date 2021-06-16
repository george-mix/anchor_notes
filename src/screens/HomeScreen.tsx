import React from "react";
import { Text, View } from "react-native";

import CollectionList from "../components/collections/CollectionList";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CollectionList />
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
