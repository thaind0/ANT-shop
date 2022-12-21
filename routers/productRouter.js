import express from "express";
import Product from "../models/Product.js";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getProducts();
  console.log(products);
  res.render("products/index", { products });
});

router.get("/create", (req, res) => {
  res.render("products/create");
});

router.post("/create", async (req, res) => {
  const product = new Product();
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.image = req.body.image;

  await createProduct(product);
  res.redirect("/products");
});

export default router;
