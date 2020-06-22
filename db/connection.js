const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  useFindAndModify: false,
});
module.exports = mongoose.connection;
