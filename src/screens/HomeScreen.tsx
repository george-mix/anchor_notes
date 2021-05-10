import React from "react";
import { Text, View } from "react-native";

import CollectionList from "../components/CollectionList";

const HomeScreen: React.FC = () => (
  <View>
    <Text>Home!</Text>
    <CollectionList />
  </View>
);

export default HomeScreen;
