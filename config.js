const dotenv = require("dotenv");

dotenv.config();

const config = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
};

module.exports = config;
