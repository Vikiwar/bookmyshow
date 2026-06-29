const mongoose = require("mongoose");

const dburl = process.env.DBURL;

// console.log(`this is my dburl ${dburl}`);

const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
