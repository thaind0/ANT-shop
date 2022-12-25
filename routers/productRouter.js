import express from "express";
import Product from "../models/Product.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/productController.js";
import { isAdmin } from "../controllers/userController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const id = req.query.id;
  const product = await getProduct(id);
  const role = req.session.user ? req.session.user.role : "";

  res.render("product/index", { product, role });
});

router.get("/create", isAdmin, (req, res) => {
  const role = req.session.user ? req.session.user.role : "";

  res.render("product/create", { role });
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

router.get("/edit", isAdmin, async (req, res) => {
  const id = req.query.id;
  const product = await getProduct(id);
  const role = req.session.user ? req.session.user.role : "";

  res.render("product/edit", { product, role });
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

router.post("/delete", isAdmin, async (req, res) => {
  const id = req.body.id;
  if (id) {
    await deleteProduct(id);
  }

  res.redirect("/");
});

router.post("/search", async (req, res) => {
  const search = `search=${req.body.search}`;
  const category = `category=${req.body.category}`;

  res.redirect(`/?${search}&${category}`);
});

export default router;
