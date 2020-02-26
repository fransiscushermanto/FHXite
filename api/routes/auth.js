var express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controller/users");
const passportSignIn = passport.authenticate("signin", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});

router.route("/auth/get").get(UsersController.getUsers);

router.route("/auth/delete").post(UsersController.deleteUser);

router
  .route("/auth/register")
  .post(validateBody(schemas.registerSchema), UsersController.signUp);

router
  .route("/auth/login")
  .post(
    validateBody(schemas.loginSchema),
    passportSignIn,
    UsersController.signIn
  );

router
  .route("/auth/oauth/google")
  .post(passportGoogle, UsersController.googleOAuth);

router
  .route("/auth/oauth/facebook")
  .post(passportFacebook, UsersController.facebookOAuth);

router.route("/auth/secret").get(passportJWT, UsersController.secret);

module.exports = router;
