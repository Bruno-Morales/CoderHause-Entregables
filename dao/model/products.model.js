const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const productsCollection = "products";

const productsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

module.exports = productsModel;
