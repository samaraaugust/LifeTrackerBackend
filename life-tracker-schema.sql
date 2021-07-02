CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1), 
    username TEXT NOT NULL UNIQUE, 
    is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercise (
    user_id INTEGER NOT NULL,
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, 
    duration INTEGER NOT NULL,
    intensity INTEGER NOT NULL CHECK (intensity < 11 AND intensity > 0),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);