var router = require("express").Router();
const verify = require("../middlewares/verifytoken");
const User = require("../models/user_model");

router.get("/", verify, (req, res) => {
  res.send(req.user);
});
module.exports = router;
