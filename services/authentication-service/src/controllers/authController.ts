import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface partialUser {
  isNew: boolean;
  authUserId: string;
  provider: string;
  displayName: string;
  email: string;
}
//


// The verify function for Google OIDC strategy

export const verify = async (
  issuer: string,
  profile: any,
  done: (err: any, user?: any) => void
) => {
  console.log(profile);
  const providerUserId = profile.id;
  const userEmail = profile.emails && profile.emails[0]?.value
  const userName = profile.displayName;

  if (!userEmail) {
    return done(new Error('Email not provided by Google.'), null);
  }

  try {
    // 1. Check if this Google account is already linked
      console.log("Checking for existing credentials...");
    const credentialResult = await pool.query(
      'SELECT * FROM auth_credentials WHERE provider = $1 AND provider_user_id = $2',
      [issuer, providerUserId]
    );

    if (credentialResult.rows.length > 0) {
      // --- SCENARIO 1: RETURNING USER ---
      const existingCredential = credentialResult.rows[0];
      const userResult = await pool.query(
        'SELECT id, email, name FROM users WHERE id = $1',
        [existingCredential.user_id]
      );

      if (userResult.rows.length === 0) {
        return done(new Error('User not found for existing credential.'), null);
      }
      console.log("Existing user found, logging in.");
      let userProfile;
      try{
          const response = await axios.get(process.env.USER_SERVICE_URL + `/api/internal/users/by-auth-id/${providerUserId}`);
          userProfile = response.data;
          if(userProfile){
            return done(null, userProfile);
      }
    }
      catch(err : any){
        if (axios.isAxiosError(err) && err.response?.status === 404) {
        // User profile does NOT exist - This is okay, it means they are new
        userProfile = null;
      } else {
        // Different error (User service down? Network issue?)
        throw err; // Let the outer catch handle it
      }
      }
      if(userProfile){
        return done(null, userProfile);
      }
    
    //  account not linked yet
    const existingUserByEmailResult = await pool.query(
      'SELECT id, email, name FROM users WHERE email = $1',
      [userEmail]
    );
    // a  transaction has started here that's why we use pool.connect
    const client = await pool.connect();
    try {
      if (existingUserByEmailResult.rows.length > 0) {
        // --- SCENARIO 2: EXISTING USER, NEW GOOGLE LINK ---
        const existingUser: User = existingUserByEmailResult.rows[0];
        await client.query(
          'INSERT INTO auth_credentials (user_id, provider, provider_user_id) VALUES ($1, $2, $3)',
          [existingUser.id, issuer, providerUserId]
        );
        console.log('Linked Google account to existing user.');
        return done(null, existingUser);
      } else {
        // --- SCENARIO 3: NEW USER ---
        const partialUser  = {
          isNew: true, // Indicate that this is a new user
          authUserId: providerUserId, // The Google ID
          provider: issuer, // eg. google
          displayName: userName,
          email: userEmail,
        };
        return done(null, partialUser);
      }
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  } catch (err) {
    return done(err);
  }
}


export const handleGoogleRedirect = (req: Request, res: Response) => {
  // to take username from front-end after first time login

  const potentialPartialUser = req.user as any;
  if (potentialPartialUser.isNew) {
    const tempToken = jwt.sign(
      {
        authUserId: potentialPartialUser.authUserId,
        provider: potentialPartialUser.provider,
        displayName: potentialPartialUser.displayName,
        email: potentialPartialUser.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" } // short as it's sensitive info
    );
    console.log("New user registration initiated.");
    // Send a response telling the frontend to ask for a username.
    // The frontend will see this and redirect to /create-profile.
    res.json({
      status: "pending_registration",
      tempToken: tempToken,
    });
  } else {
    // --- SCENARIO A: User EXISTS ---
    // User is already in req.user, just call your existing JWT generator
    console.log("Existing user login.");
    generateJwtForUser(req, res);
  }
  }

  export const completeGoogleRegistration = async (req: Request, res: Response) => {
    const {username} = req.body;
    const authHeader = req.headers.authorization;
    const tempToken =  authHeader?.split(' ')[1];
    if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }
  if (!tempToken) {
    return res.status(401).json({ message: "Missing registration token." });
  }
    let payload : partialUser;
    try{
      payload = jwt.verify(tempToken, process.env.JWT_SECRET!) as partialUser;
    } 
    catch (err) {
      return res.status(401).json({ message: "Invalid or expired registration token." });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const newUserResult = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, email, name",
      [payload.displayName, payload.email]
    );
   
    const newUser: User = newUserResult.rows[0];
     await client.query(
      "INSERT INTO auth_credentials (user_id, provider, provider_user_id) VALUES ($1, $2, $3)",
      [newUser.id, payload.provider, payload.authUserId]
    );

    await axios.post(process.env.USER_SERVICE_URL + "/api/internal/users", {
      authUserId: payload.authUserId,
      username: username,
    });
    
    await client.query("COMMIT");

    const loginToken = jwt.sign({ sub: newUser.id }, process.env.JWT_SECRET!);
    return res.status(201).json({ token: loginToken, user: newUser });

    }
    catch (err: any) {
     await client.query("ROLLBACK");
    // Handle specific errors, like "username already taken" from your User Service
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      return res.status(400).json({ message: "Username is already taken." });
    }
    res.status(500).json({ message: "Registration failed.", error: err.message });
    }
    finally {
    client.release();
  }
  };

// jwt for session of google oidc

export const generateJwtForUser = (req: Request, res: Response) => {
  if (req.user) {
    const token = jwt.sign({ sub: req.user.id }, process.env.JWT_SECRET!);
    // Instead of redirecting, send the token to the client.
    // The client-side application is then responsible for storing the
    // token and redirecting the user to the dashboard.
    res.json({ token, user: req.user });
    console.log("auth success", req.user);
  } else {
    res.status(401).json({ message: 'Authentication failed, user not found.' });
  }
}





