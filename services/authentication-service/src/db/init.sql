-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- Table: users
-- Stores core user profile information.
-- -----------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for clarity
COMMENT ON TABLE users IS 'Stores user profile information.';
COMMENT ON COLUMN users.email IS 'User''s unique email address, used for communication and login.';


-- -----------------------------------------------------
-- Table: auth_credentials
-- Stores different authentication methods for a user.
-- -----------------------------------------------------
CREATE TABLE auth_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Foreign key to the users table
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Details of the authentication provider
  provider TEXT NOT NULL,          -- e.g., 'local', 'google', 'github'
  provider_user_id TEXT,           -- The user's unique ID from the provider (e.g., Google's sub claim)
  password_hash TEXT,              -- Hashed password, ONLY for 'local' provider
  
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 🛡️ Ensures a user can only have one credential per provider.
  -- e.g., A user can't link the same Google account twice.
  UNIQUE(user_id, provider),

  -- 🛡️ Ensures a specific provider ID (like a Google account) is only used once across the entire system.
  -- This prevents one Google account from being linked to multiple different user profiles.
  UNIQUE(provider, provider_user_id)
);

-- Add comments for clarity
COMMENT ON TABLE auth_credentials IS 'Stores authentication methods (e.g., password, OAuth) for users.';
COMMENT ON COLUMN auth_credentials.user_id IS 'Links the credential to a user.';
COMMENT ON COLUMN auth_credentials.provider IS 'The authentication provider, e.g., ''local'', ''google''.';
COMMENT ON COLUMN auth_credentials.password_hash IS 'Stores the bcrypt or argon2 hash of the user''s password for the ''local'' provider.';