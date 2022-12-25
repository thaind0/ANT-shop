import bcrypt from "bcrypt";

import { getCollection } from "./index.js";

const getUserCollection = async () => {
  return await getCollection("users");
};

const findUser = async (username) => {
  const collection = await getUserCollection();
  return await collection.findOne({ username: username });
};

export const registerUser = async (user) => {
  const isExisting = await findUser(user.username);
  if (isExisting) {
    return null;
  }
  const collection = await getUserCollection();
  user.password = await bcrypt.hash(user.password, 10);
  const id = await collection.insertOne(user);
  return id;
};

export const loginUser = async (username, password) => {
  const user = await findUser(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
  }
  return null;
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/user/login");
  }
};
