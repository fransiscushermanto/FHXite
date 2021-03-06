const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-token-google").Strategy;
const FacebookStrategy = require("passport-facebook-token");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//JSON WEB TOKEN STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromHeader("authorization"),
      secretOrKey: process.env.TOKEN_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//LOGIN STRATEGY
const localStrategy = {
  usernameField: "email"
};
passport.use(
  "signin",
  new LocalStrategy(localStrategy, async (email, password, done) => {
    try {
      const user = await User.findOne({ "local.email": email });

      if (!user) {
        return done(null, false);
      }

      const isMatch = await user.isValidPassword(password);

      if (!isMatch) {
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

//FACEBOOK OAuth STRATEGY
const facebookStrategy = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET
};
passport.use(
  "facebookToken",
  new FacebookStrategy(
    facebookStrategy,
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        const existingUser = await User.findOne({
          "facebook.id": profile.id
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        console.log("User is not registered, Registering...");

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

//GOOGLE OAuth STRATEGY
const googleStrategy = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};
passport.use(
  "googleToken",
  new GoogleStrategy(
    googleStrategy,
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        const existingUser = await User.findOne({
          "google.id": profile.id
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        console.log("User is not registered, Registering...");

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
