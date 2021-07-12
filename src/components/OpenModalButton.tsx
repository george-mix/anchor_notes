import React, { Dispatch, SetStateAction } from "react";

import RoundButton from "../ui/RoundButton";

interface IOpenModalButtonProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const OpenModalButton: React.FC<IOpenModalButtonProps> = ({ setModalOpen }) => {
  const handlePress = () => {
    setModalOpen(true);
  };

  return <RoundButton onPress={handlePress} title="+" />;
};

export default OpenModalButton;
