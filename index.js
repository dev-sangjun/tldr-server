require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/*
  ADD ROUTES
*/
const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");
app.use("/login", login);
app.use("/register", register);
app.use("/users", users);

/*
  CONNECT TO MONGODB
*/
const connection = require("./db/connection");
connection.on("error", console.error);
connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
