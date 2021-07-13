import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { useDatabaseConnection } from "../../database/connection";

import CollectionListItem from "./CollectionListItem";

interface ICollectionItem {
  id: number;
  name: string;
}

const CollectionList: React.FC = () => {
  const { collectionRepository } = useDatabaseConnection();
  const [collections, setCollections] = useState<ICollectionItem[]>([]);

  const getCollectionList = async () => {
    const data = await collectionRepository.getAll();
    setCollections(data);
  };

  useEffect(() => {
    getCollectionList();
  });

  return (
    <View>
      {collections.map((collection) => (
        <CollectionListItem name={collection.name} />
      ))}
    </View>
  );
};

export default CollectionList;
