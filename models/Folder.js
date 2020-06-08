const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

folderSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "folder",
});

module.exports = mongoose.model("Folder", folderSchema);
