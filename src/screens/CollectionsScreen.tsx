import React, { useState } from "react";
import { View } from "react-native";

import CreateCollectionModal from "../components/modals/CreateCollectionModal";
import OpenModalButton from "../ui/OpenModalButton";

const CollectionsScreen: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      {modalOpen ? <CreateCollectionModal setModalOpen={setModalOpen} /> : null}
      <OpenModalButton setModalOpen={setModalOpen} />
    </View>
  );
};

export default CollectionsScreen;
