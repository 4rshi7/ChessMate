import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import session from 'express-session';
import passport from "passport";
dotenv.config();


// const pgSessionStore = new (connectPgSimple(session))({
//   pool: pool, // Your pg Pool
//   tableName: 'user_sessions' // Optional: name of the session table
// });
const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 
    }
  })
);  
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.get("/", (req, res) => res.send("Auth Service Running 🚀"));


//  listen on 0.0.0.0 so Docker container is reachable
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service listening on port ${PORT}`);
});
