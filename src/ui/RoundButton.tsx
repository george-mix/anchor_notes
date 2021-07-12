import React from "react";
import { Button } from "react-native";

interface IRoundButtonProps {
  onPress: () => void;
  title: string;
}

const RoundButton: React.FC<IRoundButtonProps> = ({ onPress, title }) => {
  return <Button onPress={onPress} title={title} />;
};

export default RoundButton;
