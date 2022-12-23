import express from "express";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const user = new User();

  if (req.body.username === "" || req.body.password === "") {
    res.render("user/register", { error: "Please fill in all fields" });
    return;
  }

  if (req.body.password !== req.body.repeatPassword) {
    res.render("user/register", { error: "Passwords do not match" });
    return;
  }

  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;

  const id = (await registerUser(user))?.insertedId?.toString();
  if (id) {
    res.redirect("/user/login");
  } else {
    res.render("user/register", { error: "Username already exists" });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const user = await loginUser(req.body.username, req.body.password);
  console.log(user);
  if (user) {
    req.session.user = user;
    res.redirect("/");
  } else {
    res.render("user/login", { error: "Invalid username or password" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default router;
