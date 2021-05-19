import React from "react";
import { View, Text } from "react-native";

import { COLLECTION_HEIGHT } from "./globals/variables";

interface CollectionItemProps {
  name: string;
}

const Collection: React.FC<CollectionItemProps> = ({ name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: COLLECTION_HEIGHT,
        padding: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default Collection;
