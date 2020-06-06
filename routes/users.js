const router = require("express").Router();

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
