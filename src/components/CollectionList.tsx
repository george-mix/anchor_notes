import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDatabaseConnection } from "../database/connection";

import Collection from "./Collection";
import NameInput from "./ui/NameInput";
import SaveButton from "./ui/SaveButton";

interface CollectionItem {
  id: number;
  name: string;
}

const CollectionList: React.FC = () => {
  const { collectionsRepository } = useDatabaseConnection();
  const { notesRepository } = useDatabaseConnection();
  const navigation = useNavigation();

  const [newCollection, setNewCollection] = useState("");
  const [collections, setCollections] = useState<CollectionItem[]>([]);

  const handleCreateCollection = useCallback(async () => {
    const collection = await collectionsRepository.create({
      name: newCollection,
    });

    setCollections((current) => [...current, collection]);

    setNewCollection("");
  }, [newCollection, collectionsRepository]);

  const handleDeleteCollection = useCallback(
    async (id: number) => {
      await collectionsRepository.delete(id);
      await notesRepository.deleteAllById(id);

      setCollections((current) =>
        current.filter((collection) => collection.id !== id)
      );
    },
    [collectionsRepository, notesRepository]
  );

  useEffect(() => {
    collectionsRepository.getAll().then(setCollections);
  }, [collectionsRepository]);

  return (
    <View>
      <View>
        <NameInput value={newCollection} onChange={setNewCollection} />
        <SaveButton title="Create" onPress={handleCreateCollection} />
      </View>
      <View>
        {collections.map((collection) => (
          <TouchableOpacity
            key={String(collection.id)}
            onPress={() => navigation.navigate("Schema", { id: collection.id })}
            onLongPress={() => handleDeleteCollection(collection.id)}
          >
            <Collection name={collection.name} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CollectionList;
