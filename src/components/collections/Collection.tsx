import React from "react";
import { View, Text } from "react-native";

interface CollectionItemProps {
  name: string;
}

const Collection: React.FC<CollectionItemProps> = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Collection;
