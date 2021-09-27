import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";

import useCollections from "../../store/useCollections";

import CollectionListItem from "./CollectionListItem";

const CollectionList: React.FC = () => {
  const { collections, getAllCollections, deleteCollection } = useCollections();

  useEffect(() => {
    getAllCollections();
  });

  return (
    <View>
      {collections.map((collection) => (
        <TouchableOpacity
          key={String(collection.id)}
          onLongPress={() => deleteCollection(collection.id)}
        >
          <CollectionListItem name={collection.name} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CollectionList;
