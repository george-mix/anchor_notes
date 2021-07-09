import React, { Dispatch, useRef, useState } from "react";
import { Button, TextInput, Modal } from "react-native";

interface ICreateCollectionProps {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateCollectionModal: React.FC<ICreateCollectionProps> = ({
  setModalOpen,
}) => {
  const collectionNameInput = useRef<TextInput>(null);
  const [collectionName, setCollectionName] = useState<string>();

  const handleMount = () => {
    collectionNameInput.current?.focus();
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
        value={collectionName}
      />
      <Button title="close" onPress={handleClose} />
    </Modal>
  );
};

export default CreateCollectionModal;
