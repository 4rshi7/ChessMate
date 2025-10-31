import { Router, Request, Response } from "express";
import { completeGoogleRegistration, generateJwtForUser, handleGoogleRedirect, verify } from "../controllers/authController";
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
  )
);


const router = Router();
// router.post("/register", register);
// router.post("/login", login);
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false 
}),handleGoogleRedirect
);
// final registration step after first time login after getting username from front-end
router.post('/register/complete',completeGoogleRegistration);

// maybe add logout route later 

export default router;
