import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loadCollectionsRequested } from "../../store/reducers/collections/collectionActions";
import { selectCollections } from "../../store/reducers/collections/collectionSelector";

import CollectionListItem from "./CollectionListItem";

const CollectionList: React.FC = () => {
  const collections = useSelector(selectCollections);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCollectionsRequested());
  }, [dispatch]);

  return (
    <View>
      {collections?.data.map((collection) => (
        <TouchableOpacity key={String(collection.id)}>
          <CollectionListItem name={collection.name} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CollectionList;
