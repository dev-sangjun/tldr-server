const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Folder",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
