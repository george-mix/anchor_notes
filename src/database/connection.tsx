import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Connection, createConnection } from "typeorm";
import { ActivityIndicator } from "react-native";

import Collection from "./models/Collection";
import CollectionRepository from "./repositories/CollectionRepository";

interface DatabaseConnectionContextData {
  collectionRepository: CollectionRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    try {
      const createdConnection = await createConnection({
        type: "react-native",
        database: "anchor_notes.db",
        location: "default",
        entities: [Collection],
        synchronize: true,
      });
      setConnection(createdConnection);
    } catch (error) {
      console.log(error);
    }
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
        collectionRepository: new CollectionRepository(connection),
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
