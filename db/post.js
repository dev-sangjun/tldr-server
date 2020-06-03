const Post = require("../models/Post");

const createPost = (title, content, tags) =>
  new Promise((resolve, reject) => {
    const post = new Post({
      title,
      content,
      tags,
    });
    post
      .save()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });

const getAllPosts = () =>
  new Promise((resolve, reject) => {
    Post.find({})
      .then(docs => resolve(docs))
      .catch(err => reject(err));
  });

module.exports = {
  createPost,
  getAllPosts,
};
