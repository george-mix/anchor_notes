import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { useDatabaseConnection } from "../../database/connection";
import { useId } from "../../hooks/useId";
import CreateRootModal from "../modals/CreateRootModal";
import CreateChildModal from "../modals/CreateChildModal";
import { INoteItem } from "../types";

type SchemaParamList = {
  Data: {
    id: number;
  };
};

const NoteList: React.FC = () => {
  const { notesRepository } = useDatabaseConnection();
  const navigation = useNavigation();

  const [rootModalVisible, setRootModalVisible] = useState<boolean>(false);
  const [childModalVisible, setChildModalVisible] = useState<boolean>(false);

  const rootId = useId((state) => state.id);
  const newId = useId((state) => state.newId);

  const [notes, setNotes] = useState<INoteItem[]>([]);
  const route = useRoute<RouteProp<SchemaParamList, "Data">>();
  const { id } = route.params;

  const handleLongPress = (noteId: number) => {
    setChildModalVisible(true);
    newId(noteId);
  };

  useEffect(() => {
    notesRepository.getAllById(id).then(setNotes);
  }, [notesRepository, id]);

  return (
    <View>
      <Pressable onPress={() => setRootModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
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
      <CreateRootModal
        modalVisible={rootModalVisible}
        setModalVisible={setRootModalVisible}
        id={id}
      />
      <CreateChildModal
        modalVisible={childModalVisible}
        setModalVisible={setChildModalVisible}
        setNotes={setNotes}
        id={id}
        rootId={rootId}
      />
    </View>
  );
};

export default NoteList;
