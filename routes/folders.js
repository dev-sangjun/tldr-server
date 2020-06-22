const router = require("express").Router(),
  { createFolder, deleteFolder, updateFolder } = require("../db/folder"),
  auth = require("../middlewares/auth");

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const folder = await updateFolder(id, title);
    res.json(folder);
  } catch (e) {
    next(e);
  }
});

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

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const folder = await deleteFolder(id);
    res.json(folder);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
