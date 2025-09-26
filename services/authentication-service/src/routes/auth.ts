import { Router, Request, Response } from "express";
import { generateJwtForUser, login, register, verify } from "../controllers/authController";
import jwt from "jsonwebtoken";

const passport  = require("passport");

const GoogleStrategy = require("passport-google-oidc");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/oauth2/redirect/google',
      // For OIDC, the standard scopes are 'openid', 'email', and 'profile'
      scope: ['openid', 'email', 'profile'],
    },
    verify
    // The verify function signature changes for OIDC
  )
);


const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false 
}),generateJwtForUser
);

// router.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

export default router;
