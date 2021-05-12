import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TextInput, View, Button } from "react-native";

import { useDatabaseConnection } from "../database/connection";

type SchemaParamList = {
  Data: {
    id: number;
  };
};

const NoteScreen = () => {
  const { notesRepository } = useDatabaseConnection();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const route = useRoute<RouteProp<SchemaParamList, "Data">>();
  const navigation = useNavigation();
  const { id } = route.params;

  const handleSave = async () => {
    await notesRepository.update({ id, name, text });
  };

  useEffect(() => {
    const fetchNote = async () => {
      const note = await notesRepository.getOne(id);
      if (note) {
        setName(note.name);
        setText(note.text);
      } else {
        navigation.goBack();
      }
    };
    fetchNote();
  }, [notesRepository, id, navigation]);

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <TextInput
        placeholder="Enter your note"
        value={text}
        onChangeText={setText}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};
export default NoteScreen;
