import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Connection, createConnection } from "typeorm";
import { ActivityIndicator } from "react-native";

import CollectionModel from "./models/CollectionModel";
import CollectionsRepository from "./repositories/CollectionsRepository";
import NoteModel from "./models/NoteModel";
import NotesRepository from "./repositories/NoteRepository";

interface DatabaseConnectionContextData {
  collectionsRepository: CollectionsRepository;
  notesRepository: NotesRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: "expo",
      database: "anchor_notes.db",
      driver: require("expo-sqlite"),
      entities: [CollectionModel, NoteModel],
      synchronize: true,
    });
    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        collectionsRepository: new CollectionsRepository(connection),
        notesRepository: new NotesRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  return context;
}
