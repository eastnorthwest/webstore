DROP TABLE IF EXISTS return_items;
DROP TABLE IF EXISTS returns;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS shipping;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS countries;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(256) NOT NULL,
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  address VARCHAR(128),
  address2 VARCHAR(128),
  phone VARCHAR(64),
  city VARCHAR(128),
  state_id INTEGER NOT NULL,
  country_id INTEGER NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER NOT NULL,
  title VARCHAR(128) NOT NULL,
  description VARCHAR(1024)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  title VARCHAR(128) NOT NULL,
  description VARCHAR(1024),
  price NUMERIC(8,2) NOT NULL
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  list_order INTEGER,
  data bytea
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  session VARCHAR(128) NOT NULL,
  shipping_id INTEGER NOT NULL,
  transaction VARCHAR(32) UNIQUE,
  datetime TIMESTAMP
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES cart(id),
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(8, 2) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  shipping_id INTEGER NOT NULL,
  transaction VARCHAR(32) UNIQUE,
  datetime TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(8, 2) NOT NULL,
  active INTEGER NOT NULL
);

CREATE TABLE returns (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  order_id INTEGER NOT NULL REFERENCES orders(id),
  transaction VARCHAR(32) UNIQUE,
  datetime TIMESTAMP
);

CREATE TABLE return_items (
  id SERIAL PRIMARY KEY,
  return_id INTEGER NOT NULL REFERENCES returns(id),
  order_item_id INTEGER NOT NULL REFERENCES order_items(id),
  quantity INTEGER NOT NULL
);

CREATE TABLE shipping (
  id SERIAL PRIMARY KEY,
  title VARCHAR(32),
  rate NUMERIC(8, 2) NOT NULL
);

CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  shortname VARCHAR(2) NOT NULL,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  shortname VARCHAR(2) NOT NULL,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE sessions (
  id      VARCHAR UNIQUE,
  user_id INTEGER REFERENCES users(id),
  cart_id INTEGER,
  is_admin BOOLEAN,
  datetime TIMESTAMP
);
