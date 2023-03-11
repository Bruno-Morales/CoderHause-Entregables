const express = require("express");
const app = express();
var productsRouter = require("./routes/products");
var cartsRouter = require("./routes/carts");
var cookieParser = require("cookie-parser");
var path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.listen(8080);

module.exports = app;
