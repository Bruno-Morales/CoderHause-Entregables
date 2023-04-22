const express = require("express");
const app = express();
var productsRouter = require("./routes/products");
var cartsRouter = require("./routes/carts");
var realtimeproductRouter = require("./routes/realtimeproduct");
var homeRouter = require("./routes/home");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var path = require("path");
const { engine } = require("express-handlebars");
const socket = require("../socket");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.NAME_DB}:${process.env.S3_BUCKET}@coderclouster.9rlxs4i.mongodb.net/test?retryWrites=true&w=majority`
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "../public/views"));
app.set("view engine", "handlebars");

app.use("/", homeRouter);

app.use("/realtimeproducts", realtimeproductRouter);

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Listening on PORT 8080");
});

socket.connect(httpServer);

module.exports = app;
