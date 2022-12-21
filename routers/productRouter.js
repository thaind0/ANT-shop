import express from "express";
import Product from "../models/Product.js";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const product = await getProduct(id);
  console.log(product);
  res.render("product/index", { product });
});

router.get("/create", (req, res) => {
  res.render("product/create");
});

router.post("/create", async (req, res) => {
  const product = new Product();
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.image = req.body.image;

  const id = (await createProduct(product)).insertedId.toString();
  //   id as query string
  res.redirect(`/product/?id=${id}`);
});

export default router;
