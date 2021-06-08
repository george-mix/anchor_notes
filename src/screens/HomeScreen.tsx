import React from "react";
import { View } from "react-native";

import CollectionList from "../components/collections/CollectionList";

const HomeScreen: React.FC = () => {
  return (
    <View>
      <CollectionList />
    </View>
  );
};

export default HomeScreen;
