import React, { useState } from "react";
import { View } from "react-native";

import CollectionList from "../components/collections/CollectionList";
import CreateCollectionModal from "../components/modals/CreateCollectionModal";
import OpenModalButton from "../components/OpenModalButton";

const CollectionsScreen: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <CollectionList />
      {modalOpen ? <CreateCollectionModal setModalOpen={setModalOpen} /> : null}
      <OpenModalButton setModalOpen={setModalOpen} />
    </View>
  );
};

export default CollectionsScreen;
