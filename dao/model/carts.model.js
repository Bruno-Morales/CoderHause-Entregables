const mongoose = require("mongoose");

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;
