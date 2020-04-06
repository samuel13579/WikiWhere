require('dotenv').config()
const mongoose = require("mongoose");
const MONGOURL = process.env.MONGODB_URL;
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;