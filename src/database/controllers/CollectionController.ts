import { getRepository } from "typeorm";

import Collection from "../models/Collection";

interface ICreateCollectionData {
  name: string;
}

export const getAll = async () => {
  const result = await getRepository(Collection).find();
  return result ? result : [];
};

export const createCollection = async ({ name }: ICreateCollectionData) => {
  try {
    const collection = await getRepository(Collection).create({
      name,
    });
    await getRepository(Collection).save(collection);
    const result = await getRepository(Collection).find();
    return result ? result : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteCollection = async (id: number) => {
  await getRepository(Collection).delete(id);
  const result = await getRepository(Collection).find();
  return result ? result : [];
};
