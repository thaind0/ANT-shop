import { getCollection } from "./index.js";

const getProductCollection = async () => {
  return await getCollection("products");
};
