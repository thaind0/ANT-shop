import mongodb from "mongodb";
import { MONGODB_URI, MONGODB_DB } from "../config.js";

const MongoClient = mongodb.MongoClient;
const url = MONGODB_URI;
const dbName = MONGODB_DB;

const getDB = async () => {
  try {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

export const getCollection = async (collectionName) => {
  const db = await getDB();
  return db.collection(collectionName);
};

export default getDB;
