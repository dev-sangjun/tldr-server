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
  CONNECT TO MONGODB
*/
const connection = require("./db/connection");
connection.on("error", console.error);
connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

/*
  ADD ROUTES
*/

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
