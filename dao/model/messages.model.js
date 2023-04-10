const mongoose = require("mongoose");

const messaggesCollection = "messagges";

const messaggesSchema = new mongoose.Schema({
  user: String,
  mesagge: String,
});

const messaggesModel = mongoose.model(messaggesCollection, messaggesSchema);

module.exports = messaggesModel;
