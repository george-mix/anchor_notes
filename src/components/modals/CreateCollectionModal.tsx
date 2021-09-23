import React, { Dispatch, useRef, useState } from "react";
import { Text, Button, TextInput, Modal } from "react-native";

import { useDatabaseConnection } from "../../database/connection";

interface ICreateCollectionProps {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateCollectionModal: React.FC<ICreateCollectionProps> = ({
  setModalOpen,
}) => {
  const { collectionRepository } = useDatabaseConnection();

  const collectionNameInput = useRef<TextInput>(null);

  const [collectionName, setCollectionName] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleMount = () => {
    collectionNameInput.current?.focus();
  };

  const handleSubmit = async () => {
    if (collectionName === "") {
      setIsError(true);
    } else {
      await collectionRepository.create({ name: collectionName });
      setCollectionName("");
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal onShow={handleMount}>
      <TextInput
        ref={collectionNameInput}
        placeholder="Enter Collection Name"
        onChangeText={setCollectionName}
        onSubmitEditing={handleSubmit}
        value={collectionName}
      />
      {isError ? <Text>Field should not be empty</Text> : null}
      <Button title="close" onPress={handleClose} />
      <Button title="Create" onPress={handleSubmit} />
    </Modal>
  );
};

export default CreateCollectionModal;
