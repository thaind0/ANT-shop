import express from "express";
import hbs from "hbs";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { PORT, SECRET, SESS_EXPIRY } from "./config.js";
import { getProducts } from "./controllers/productController.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.set("view engine", "hbs");
app.use(
  session({
    secret: SECRET,
    saveUninitialized: false,
    cookie: { maxAge: Number(SESS_EXPIRY) },
    resave: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const products = await getProducts();
  const role = req.session.user ? req.session.user.role : "";

  res.render("index", { products, role });
});

app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
