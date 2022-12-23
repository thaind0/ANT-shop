import express from "express";
import Product from "../models/Product.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuthorized } from "../controllers/userController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const product = await getProduct(id);
  const role = req.session.user ? req.session.user.role : "";
  console.log(product);
  res.render("product/index", { product, role });
});

router.get("/create", isAuthorized, (req, res) => {
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

router.get("/edit",isAuthorized, async (req, res) => {
  const id = req.query.id;
  const product = await getProduct(id);
  res.render("product/edit", { product });
});

router.post("/edit", async (req, res) => {
  const id = req.body.id;
  const product = new Product();
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.image = req.body.image;

  await updateProduct(id, product);
  res.redirect(`/product/?id=${id}`);
});

router.post("/delete", async (req, res) => {
  const id = req.body.id;
  if (id) {
    await deleteProduct(id);
  }

  res.redirect("/");
});

export default router;
