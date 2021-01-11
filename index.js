var path = require("path");
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const morgan = require("morgan");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
var cookieParser = require("cookie-parser");
let passportConfig = require("./controllers/PassportConfig");

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "usg",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up for HandleBars
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default-layout",
    layoutsDir: "./views/layouts/",
    partialsDir: "./views/partials/",
  })
);

app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.static("./pages/admin"));
app.use("/resources", express.static("./resources"));

passportConfig.init(passport);

const indexRouter = require("./routes/IndexRoute");
app.use("/", indexRouter);

let loginRouter = require("./routes/LoginRoute");
app.use("/login", loginRouter);

let signUpRouter = require("./routes/SignUpRoute");
app.use("/sign-up", signUpRouter);

app.get("/forgot-pwd", (req, res) => {
  res.render("forgot-pwd", { layout: "forgot-pwd-layout" });
});

let inforRouter = require("./routes/UserInforRoute");
app.use("/infor", inforRouter);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

const orderListRouter = require("./routes/OrderListRoute");
app.use("/order-list", orderListRouter);

const listProductRouter = require("./routes/ListProductRoute");
app.use("/list-product", listProductRouter);

const itemRouter = require("./routes/ItemDetailRoute");
app.use("/list-product/item", itemRouter);

const shoppingCartRouter = require("./routes/ShoppingCartRoute");
app.use("/shopping-cart", shoppingCartRouter);

app.listen(port, () => {
  console.log(`App is listening on https://usg-clothes.herokuapp.com:${port}`);
});
