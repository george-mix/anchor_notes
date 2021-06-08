import { Dispatch, SetStateAction } from "react";

export interface INoteItem {
  id: number;
  name: string;
  collectionId: number;
  isRoot: boolean;
  parentId: number | null;
}

export interface IModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setNotes?: Dispatch<SetStateAction<INoteItem[]>>;
  id: number;
  rootId?: number;
}
