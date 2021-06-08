import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { useDatabaseConnection } from "../../database/connection";
import { IModalProps } from "../types";
import NameInput from "../ui/NameInput";
import SaveButton from "../ui/SaveButton";

const CreateRootModal: React.FC<IModalProps> = ({
  modalVisible,
  setModalVisible,
  setNotes,
  id,
}) => {
  const { notesRepository } = useDatabaseConnection();
  const [newRoot, setNewRoot] = useState("");

  const handleCreateRoot = async () => {
    await notesRepository.createRootNote({
      name: newRoot,
      collectionId: id,
    });
    notesRepository.getAllById(id).then(setNotes);
    setNewRoot("");
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible}>
      <View>
        <NameInput value={newRoot} onChange={setNewRoot} />
        <SaveButton title="Create" onPress={handleCreateRoot} />
      </View>
      <Pressable onPress={() => setModalVisible(false)}>
        <Text>Close Modal</Text>
      </Pressable>
    </Modal>
  );
};

export default CreateRootModal;
