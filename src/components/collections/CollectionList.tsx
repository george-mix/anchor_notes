import React, { useEffect } from "react";
import { View } from "react-native";

import useCollections from "../../store/useCollections";

import CollectionListItem from "./CollectionListItem";

const CollectionList: React.FC = () => {
  const collections = useCollections((state) => state.collections);
  const getAllCollections = useCollections((state) => state.getAll);

  useEffect(() => {
    getAllCollections();
  });

  return (
    <View>
      {collections.map((collection) => (
        <CollectionListItem key={collection.id} name={collection.name} />
      ))}
    </View>
  );
};

export default CollectionList;
