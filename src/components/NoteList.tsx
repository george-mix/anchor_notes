import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Pressable, Modal } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { useDatabaseConnection } from "../database/connection";

import NameInput from "./ui/NameInput";
import SaveButton from "./ui/SaveButton";
import { useId } from "./useId";

type SchemaParamList = {
  Data: {
    id: number;
  };
};

interface INoteItem {
  id: number;
  name: string;
  collectionId: number;
  isRoot: boolean;
  parentId: number | null;
}

const NoteList: React.FC = () => {
  const { notesRepository } = useDatabaseConnection();
  const navigation = useNavigation();

  const [rootModalVisible, setRootModalVisible] = useState<boolean>(false);
  const [childModalVisible, setChildModalVisible] = useState<boolean>(false);

  const [newNote, setNewNote] = useState("");
  const [newRoot, setNewRoot] = useState("");

  const rootId = useId((state) => state.id);
  const newId = useId((state) => state.newId);

  const [notes, setNotes] = useState<INoteItem[]>([]);
  const route = useRoute<RouteProp<SchemaParamList, "Data">>();
  const { id } = route.params;

  const handleCreateRoot = useCallback(async () => {
    await notesRepository.createRootNote({
      name: newRoot,
      collectionId: id,
    });
    notesRepository.getAllById(id).then(setNotes);
    setNewRoot("");
    setRootModalVisible(false);
  }, [newRoot, notesRepository, id]);

  const handleCreateNote = useCallback(async () => {
    await notesRepository.createChildNote({
      name: newNote,
      collectionId: id,
      parentId: rootId,
    });
    notesRepository.getAllById(id).then(setNotes);
    setNewNote("");
  }, [newNote, notesRepository, id, rootId]);

  const handleLongPress = (noteId: number) => {
    setChildModalVisible(true);
    newId(noteId);
  };

  const handleDelete = useCallback(async () => {
    await notesRepository.deleteOne(rootId);
    setNotes((current) => current.filter((note) => note.id !== rootId));
    setChildModalVisible(false);
  }, [notesRepository, rootId]);

  useEffect(() => {
    notesRepository.getAllById(id).then(setNotes);
  }, [notesRepository, id]);

  return (
    <View>
      <Pressable onPress={() => setRootModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
      <Modal visible={rootModalVisible}>
        <View>
          <NameInput value={newRoot} onChange={setNewRoot} />
          <SaveButton title="Create" onPress={handleCreateRoot} />
        </View>
        <Pressable onPress={() => setRootModalVisible(false)}>
          <Text>Close Modal</Text>
        </Pressable>
      </Modal>
      <View>
        {notes.map((note) => (
          <TouchableOpacity
            key={String(note.id)}
            onPress={() => navigation.navigate("Note", { id: note.id })}
            onLongPress={() => handleLongPress(note.id)}
          >
            <Text>{String(note.parentId)}</Text>
            <Text>{note.name}</Text>
            <Text>{String(note.isRoot)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={childModalVisible}>
        <View>
          <NameInput value={newNote} onChange={setNewNote} />
          <SaveButton title="Create" onPress={handleCreateNote} />
          <Pressable onPress={() => setChildModalVisible(false)}>
            <Text>Close Modal</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default NoteList;
