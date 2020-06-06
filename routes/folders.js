const router = require("express").Router(),
  { getFolder } = require("../db/folder"),
  auth = require("../middlewares/auth");

router.get("/", async (req, res) => {});

module.exports = router;
