import React from "react";
import { View } from "react-native";

import NoteList from "../components/notes/NoteList";
import TestTree from "../components/notes/TestTree";

const SchemaScreen: React.FC = () => {
  return (
    <View>
      <NoteList />
      <TestTree />
    </View>
  );
};

export default SchemaScreen;
