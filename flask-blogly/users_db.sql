-- from the terminal run:
-- psql < users_db.sql

DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

\c users_db

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  image_url TEXT
);

INSERT INTO users (first_name, last_name, image_url) VALUES ('Alan', 'Alda', '/images/user-img.jpg');
INSERT INTO users (first_name, last_name, image_url) VALUES ('Joel', 'Burton', '/images/user-img.jpg');
INSERT INTO users (first_name, last_name, image_url) VALUES ('Jane', 'Smith', '/images/user-img.jpg');

