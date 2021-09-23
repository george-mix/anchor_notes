import CollectionsRepository from "../../database/repositories/CollectionRepository";

interface IGetCollectionListProps {
  collectionRepository: CollectionsRepository;
}

export const getCollectionList = async ({
  collectionRepository,
}: IGetCollectionListProps) => {
  try {
    const data = await collectionRepository.getAll();
    return data;
  } catch (e) {
    return [];
  }
};
