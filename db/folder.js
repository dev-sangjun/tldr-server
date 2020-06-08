const Folder = require("../models/Folder"),
  User = require("../models/User");

const createFolder = (id, title) =>
  new Promise((resolve, reject) => {
    const folder = new Folder({
      author: id,
      title,
    });
    folder
      .save()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
const getFolders = id =>
  new Promise((resolve, reject) => {
    User.findById(id)
      .then(async user => {
        console.log(user);
        await user.populate("folders").execPopulate();
        await user
          .populate({
            path: "folders",
            populate: { path: "posts" },
          })
          .execPopulate();
        resolve(user.folders);
      })
      .catch(err => reject(err));
  });

module.exports = {
  createFolder,
  getFolders,
};
