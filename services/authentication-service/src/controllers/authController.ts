import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/db";

interface User {
      id: string;
      email: string;
      name: string;
    }


    // mock custom auth for demo purposes
const users: { username: string; password: string }[] = [];
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "username + password required" });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ error: "user already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  return res.status(201).json({ message: "registered" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET ?? "devsecret", { expiresIn: "1h" });
  return res.json({ token });
};
//


// The verify function for Google OIDC strategy

export const verify =  async (issuer: string, profile:any, done: (err: any, user?: any) => void) => {

      // The `profile` object now contains OIDC claims
      const providerUserId = profile.id; // Corresponds to the 'sub' (subject) claim
      const userEmail = profile.emails && profile.emails[0]?.value;// Directly available on the profile
      const userName = profile.displayName; // OIDC 'name' claim is mapped to displayName

      if (!userEmail) {
        return done(new Error('Email not provided by Google.'), null);
      }

      try {
        
        // 1. Check if this Google account is already linked
     
        const credentialResult = await pool.query(
          'SELECT * FROM auth_credentials WHERE provider = $1 AND provider_user_id = $2',
          [issuer, providerUserId] // Use issuer (e.g., 'google')
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
          return done(null, userResult.rows[0]);
        }
        
        // The rest of the logic for linking an existing user by email
        // or creating a new user is EXACTLY the same as before.
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
            return done(null, existingUser);
          } else {
            // --- SCENARIO 3: COMPLETELY NEW USER ---
            await client.query('BEGIN');
            const newUserResult = await client.query(
              'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, email, name',
              [userName, userEmail]
            );
            const newUser: User = newUserResult.rows[0];
            await client.query(
              'INSERT INTO auth_credentials (user_id, provider, provider_user_id) VALUES ($1, $2, $3)',
              [newUser.id, issuer, providerUserId]
            );
            await client.query('COMMIT');
            return done(null, newUser);
          }
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

      } catch (err) {
        return done(err);
      }
    }

// jwt for session of google oidc

export const generateJwtForUser = (req : Request,  res:Response) => {
    if (req.user) {
      const token = jwt.sign( { sub: req.user.id } , process.env.JWT_SECRET!);
      // Instead of redirecting, send the token to the client.
      // The client-side application is then responsible for storing the
      // token and redirecting the user to the dashboard.
        res.json({ token, user: req.user });
      console.log("auth success", req.user);
    } else {
      res.status(401).json({ message: 'Authentication failed, user not found.' });
    }
}





