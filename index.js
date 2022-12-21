import express from "express";
import { PORT } from "./config.js";
import { getProducts } from "./controllers/productController.js";
import productRouter from "./routers/productRouter.js";

const app = express();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  // const products = await getProducts();
  res.render("index");
});

app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
