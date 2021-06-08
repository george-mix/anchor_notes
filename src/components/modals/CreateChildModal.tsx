import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { useDatabaseConnection } from "../../database/connection";
import { IModalProps } from "../types";
import NameInput from "../ui/NameInput";
import SaveButton from "../ui/SaveButton";

const CreateChildModal: React.FC<IModalProps> = ({
  modalVisible,
  setModalVisible,
  setNotes,
  id,
  rootId,
}) => {
  const { notesRepository } = useDatabaseConnection();
  const [newNote, setNewNote] = useState("");

  const handleCreateNote = async () => {
    await notesRepository.createChildNote({
      name: newNote,
      collectionId: id,
      parentId: rootId,
    });
    notesRepository.getAllById(id).then(setNotes);
    setNewNote("");
  };

  const handleDelete = async () => {
    await notesRepository.deleteOne(rootId);
    setNotes((current) => current.filter((note) => note.id !== rootId));
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible}>
      <View>
        <NameInput value={newNote} onChange={setNewNote} />
        <SaveButton title="Create" onPress={handleCreateNote} />
        <Pressable onPress={() => setModalVisible(false)}>
          <Text>Close Modal</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CreateChildModal;
