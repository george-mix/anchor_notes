import React, { useCallback, useEffect, useState } from "react";
import { Button, TouchableOpacity, View, TextInput, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useDatabaseConnection } from "../database/connection";

type SchemaParamList = {
  Data: {
    id: number;
  };
};

interface INoteItem {
  id: number;
  name: string;
  collectionId: number;
}

const NoteList: React.FC = () => {
  const { notesRepository } = useDatabaseConnection();

  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<INoteItem[]>([]);
  const route = useRoute<RouteProp<SchemaParamList, "Data">>();

  const handleCreateNote = useCallback(async () => {
    const note = await notesRepository.create({
      name: newNote,
      collectionId: route.params.id,
    });
    setNotes((current) => [...current, note]);

    setNewNote("");
  }, [newNote, notesRepository, route.params.id]);

  useEffect(() => {
    notesRepository.getAllById(route.params.id).then(setNotes);
  }, [notesRepository, route.params.id]);

  return (
    <View>
      <View>
        <TextInput value={newNote} onChangeText={setNewNote} />
        <Button title="Create" onPress={handleCreateNote} />
      </View>
      <View>
        {notes.map((note) => (
          <TouchableOpacity key={String(note.id)}>
            <Text>{note.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NoteList;
