const JWT = require("jsonwebtoken");

const User = require("../models/user");

signToken = user => {
  return JWT.sign(
    {
      sub: user.id,
      exp: new Date().setTime(new Date().getTime() + 1)
    },
    process.env.TOKEN_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const {
      full_name,
      email,
      password,
      birthday,
      phone_number,
      country
    } = req.value.body;

    const exist = await User.findOne({ "local.email": email });
    if (exist) {
      return res.status(403).send({ error: "Email already exist" });
    }

    const newUser = new User({
      method: "local",
      local: {
        full_name: full_name,
        email: email,
        password: password,
        birthday: birthday,
        phone_number: phone_number,
        country: country,
        level: "customer",
        verified: "yes",
        status: "on"
      }
    });

    await newUser.save();
    const token = signToken(newUser);
    res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log("Logged in");
  },
  googleOAuth: async (req, res, next) => {
    console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  facebookOAuth: async (req, res, next) => {
    console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    res.json({ secret: "resources" });
  },
  deleteUser: async (req, res) => {
    try {
      const del = await User.findOneAndDelete({
        user_id: req.body.id
      });
      res.status(200).json(del);
    } catch (error) {
      throw new Error(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({ user });
    } catch (error) {
      throw new Error(error);
    }
  }
};
