import { getCollection } from "./index.js";
import { ObjectId } from "mongodb";

const getProductCollection = async () => {
  return await getCollection("products");
};

export const getProducts = async () => {
  const collection = await getProductCollection();
  return await collection.find().toArray();
};

export const getProduct = async (id) => {
  const collection = await getProductCollection();
  return await collection.findOne({ _id: ObjectId(id) });
};

export const createProduct = async (product) => {
  try {
    const collection = await getProductCollection();
    const id = await collection.insertOne(product);
    return id;
  } catch (error) {
    console.warn("Error creating product", error);
  }
};

export const updateProduct = async (id, product) => {
  const collection = await getProductCollection();
  await collection.updateOne({ _id: ObjectId(id) }, { $set: product });
};

export const deleteProduct = async (id) => {
  const collection = await getProductCollection();
  await collection.deleteOne({ _id: ObjectId(id) });
};

export const getCategories = async () => {
  const collection = await getProductCollection();
  return await collection.distinct("category");
};

export const getProductsBySearch = async (category, search) => {
  const collection = await getProductCollection();
  return await collection
    .find({
      name: { $regex: search, $options: "i" },
      category: { $regex: category === "all" ? "" : category, $options: "i" },
    })
    .toArray();
};
