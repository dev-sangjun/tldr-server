const mongoose = require("mongoose");
const Post = require("../models/Post");

const createPost = (id, folder, title, content, tags) =>
  new Promise((resolve, reject) => {
    const post = new Post({
      author: id,
      folder,
      title,
      content,
      tags,
    });
    post
      .save()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });

const getPost = id =>
  new Promise((resolve, reject) => {
    Post.findById(id)
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
  getPost,
  getAllPosts,
};
