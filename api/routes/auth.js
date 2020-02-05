var router = require("express").Router();
const User = require("../models/user_model");
const {
  registerValidation,
  loginValidation
} = require("../middlewares/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const verify = require("../middlewares/verifytoken");

router.post("/auth/tes", async (req, res, next) => {
  res.status(200).send({ message: "welcome" });
});

router.post("/auth/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      res.send(info.message);
    } else {
      try {
        req.logIn(user, async err => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ message: "user created" });
        });
        next();
      } catch (error) {
        console.log(error);
      }
    }
  })(req, res, next);
});

router.post("/auth/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  passport.authenticate("login", async (err, user, info) => {
    if (err) {
      console.log(err);
    }

    if (info != undefined) {
      res.send(info.message);
    } else {
      req.logIn(user, async err => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ message: "user logged in", user });
      });
    }
  })(req, res, next);
});

module.exports = router;
