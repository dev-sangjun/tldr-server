const router = require("express").Router();
const { createPost, getPost, getAllPosts } = require("../db/post");

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

router.post("/", async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await createPost(title, content, tags);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
