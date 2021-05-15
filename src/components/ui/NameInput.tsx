import React, { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface INameInputProps {
  value: string;
  onChange: Dispatcher<string>;
}

const NameInput: React.FC<INameInputProps> = (props) => {
  return (
    <View>
      <TextInput value={props.value} onChangeText={props.onChange} />
    </View>
  );
};

export default NameInput;
