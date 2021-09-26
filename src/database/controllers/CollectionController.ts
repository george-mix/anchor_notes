import { getRepository } from "typeorm";

import Collection from "../models/Collection";

export const getAll = async () => {
  const result = await getRepository(Collection).find();
  return result ? result : [];
};
