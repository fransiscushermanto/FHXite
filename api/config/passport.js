const bcrypt = require("bcrypt");
const moment = require("moment");

const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  User = require("../models/user_model"),
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

const localOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
  session: false
};

passport.use(
  "register",
  new localStrategy(localOptions, async (req, username, password, done) => {
    try {
      console.log(password);
      const emailExist = await User.findAndCountAll({
        where: {
          email: username
        }
      });
      const exist = emailExist.count > 0 ? true : false;
      if (exist) return done(null, false, { message: "Email already Exist!" });

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      try {
        const user = await User.create({
          full_name: req.body.full_name,
          email: username,
          password: hashedPassword,
          birthday: req.body.birthday,
          phone_number: req.body.phone_number,
          country: req.body.country,
          level: "customer",
          status: "on"
        });

        console.log("user created");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "login",
  new localStrategy(localOptions, async (req, username, password, done) => {
    try {
      const user = await User.findAndCountAll({
        where: {
          email: username,
          status: "on"
        }
      });
      console.log(user.rows.length);
      if (user.rows.length == 0) {
        console.log("tes");
        return done(null, false, { message: "User not found!" });
      }

      const result = user.rows[0];
      const exist = user.count > 0 ? true : false;

      if (!exist)
        return done(null, false, { message: "Email or password is invalid" });
      const validPass = await bcrypt.compare(password, result.password);
      if (!validPass) return done(null, false, { message: "Invalid Password" });
      return done(null, result);
    } catch (error) {
      return done(error);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJWT.fromHeader("JWT"),
  secretOrKey: process.env.TOKEN_SECRET
};

passport.use(
  "jwt",
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findAndCountAll({
        where: {
          email: jwt_payload.id
        }
      });
      const exist = user.count > 0 ? true : false;
      if (exist) {
        console.log("user found");
        done(null, user);
      } else {
        console.log("user not found");
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
