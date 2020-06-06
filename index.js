const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("./middlewares/auth");
const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");
const posts = require("./routes/posts");
const folders = require("./routes/folders");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/*
  CONNECT TO MONGODB
*/
const connection = require("./db/connection");
connection.on("error", console.error);
connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

/*
  DUMMY ENDPOINT TO GET A TOKEN
*/
app.get("/token", (req, res) => {
  const payload = {
    name: "Sangjun",
  };
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(payload, JWT_SECRET);
  res.send(token);
});

/*
  ADD ROUTES
*/
app.use("/login", login);
app.use("/register", register);
app.use("/users", auth, users);
app.use("/posts", posts);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  console.log(err.message);
  res.send({ message: err.message });
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
