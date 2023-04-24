const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;
