import React from "react";
import { Button } from "react-native";

interface ISaveButton {
  title: string;
  onPress: () => void;
}

const SaveButton: React.FC<ISaveButton> = (props) => {
  return <Button title={props.title} onPress={props.onPress} />;
};

export default SaveButton;
