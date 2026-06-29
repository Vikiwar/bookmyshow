const express = require("express");

const app = express();

require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(8082, () => {
  console.log("listening on port 8082");
});
