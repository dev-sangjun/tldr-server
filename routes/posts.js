const router = require("express").Router(),
  { createPost, getPost, getAllPosts } = require("../db/post"),
  auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPost(id);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.post("/", auth, async (req, res, next) => {
  const { folder, title, content, tags } = req.body,
    { _id } = req.user;
  try {
    const post = await createPost(_id, folder, title, content, tags);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
