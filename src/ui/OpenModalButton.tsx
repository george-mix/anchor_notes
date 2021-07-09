import React, { Dispatch, SetStateAction } from "react";
import { Button } from "react-native";

interface IOpenModalButtonProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const OpenModalButton: React.FC<IOpenModalButtonProps> = ({ setModalOpen }) => {
  const handlePress = () => {
    setModalOpen(true);
  };

  return <Button onPress={handlePress} title="+" />;
};

export default OpenModalButton;
