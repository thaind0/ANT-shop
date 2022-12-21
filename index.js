import express from "express";
import getDB from "./models/index.js";
import { PORT } from "./config.js";

const app = express();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const db = await getDB();
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
