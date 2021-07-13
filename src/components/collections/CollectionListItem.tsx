import React from "react";
import { Text } from "react-native";

interface IProps {
  name: string;
}

const CollectionListItem: React.FC<IProps> = ({ name }) => {
  return <Text>{name}</Text>;
};

export default CollectionListItem;
