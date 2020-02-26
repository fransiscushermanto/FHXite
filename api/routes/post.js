const router = require("express-promise-router")();

router.post("/", (req, res) => {
  res.json(req.body);
});
module.exports = router;
