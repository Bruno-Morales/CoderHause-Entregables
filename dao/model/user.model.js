const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "usuario",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;
