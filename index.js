import express from "express";
import hbs from "hbs";
import { PORT } from "./config.js";
import { getProducts } from "./controllers/productController.js";
import productRouter from "./routers/productRouter.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const products = await getProducts();
  res.render("index", { products });
});

app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
