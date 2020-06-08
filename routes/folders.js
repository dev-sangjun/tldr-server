const router = require("express").Router(),
  { createFolder, getFolders } = require("../db/folder"),
  auth = require("../middlewares/auth");

// router.get("/", auth, async (req, res, next) => {
//   const { _id } = req.user;
//   try {
//     const folders = await getFolders(_id);
//     res.json(folders);
//   } catch (e) {
//     next(e);
//   }
// });
router.post("/", auth, async (req, res, next) => {
  const { title } = req.body,
    { _id } = req.user;
  try {
    const folder = await createFolder(_id, title);
    await folder.populate("posts").execPopulate();
    res.json(folder);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
