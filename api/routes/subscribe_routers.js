var express = require("express");
var router = express.Router();
const Subs = require("../models/sub_model");

router.get("/get", async (req, res) => {
  const sub = await Subs.findAll().catch(err => console.error(err));
  res.json({ sub });
});

router.post("/subs", async (req, res) => {
  try {
    const sub = await Subs.create({
      email: req.body.username
    });
    res.json(sub); //
  } catch (error) {
    console.error(error);
    res.status(422).json(error);
  }
});

router.post("/delete", async (req, res) => {
  const del = await Subs.destroy({
    where: {
      subs_id: req.body.id
    }
  }).catch(err => console.error(err));
  res.json(del);
});

module.exports = router;
