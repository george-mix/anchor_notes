import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { useDatabaseConnection } from "../../database/connection";
import { getCollectionList } from "../../utils/functions/collectionFunctions";
import { ICollectionItem } from "../../utils/types/interfaces";

import CollectionListItem from "./CollectionListItem";

const CollectionList: React.FC = () => {
  const { collectionRepository } = useDatabaseConnection();
  const [collections, setCollections] = useState<ICollectionItem[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollectionList({ collectionRepository });
        setCollections(data);
      } catch (e) {
        setCollections([]);
      }
    };
    fetchCollections();
  }, [collectionRepository]);

  return (
    <View>
      {collections.map((collection) => (
        <CollectionListItem key={collection.id} name={collection.name} />
      ))}
    </View>
  );
};

export default CollectionList;
