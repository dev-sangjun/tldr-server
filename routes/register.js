const router = require("express").Router();
const { createUser } = require("../db/user");

router.post("/", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
