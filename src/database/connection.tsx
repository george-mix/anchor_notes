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

interface DatabaseConnectionContextData {
  collectionsRepository: CollectionsRepository;
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
      entities: [CollectionModel],
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
