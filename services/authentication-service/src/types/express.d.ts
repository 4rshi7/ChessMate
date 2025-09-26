import "express";

declare global {
  namespace Express {
    // This is the object Passport puts on req.user
    interface User {
      id: string;
      email: string;
      name: string;
    }

    // Optional: make req.user available everywhere with correct type
    interface Request {
      user?: User;
    }
  }
}

export {};