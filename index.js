const express = require("express");
require("dotenv").config();
const connection = require("./db/connection");
const app = express();
const port = process.env.PORT || 5000;

/*
  CONNECT TO MONGODB
*/
connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
