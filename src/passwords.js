const bcrypt = require("bcrypt");
const dbConnection = require("./database/db_connection");
const SALT_ROUNDS = 12;

const passwords = {
  // takes in plaintext password and salt, hashes it, stores it in database
  // hash plaintext password
  hashPassword: (plaintext, cb) => {
    bcrypt.hash(plaintext, SALT_ROUNDS, cb, (err, hash) => {
      if (err) return cb(err);
      return cb(null, hash);
    });
  },

  storePassword: (name, email, favColour, hashedPassword, cb) => {
    dbConnection.query(
      `INSERT INTO users (name, email, fav_colour, password_hash) VALUES ($1, $2, $3, $4)`,
      [name, email, favColour, hashedPassword],
      (err, res) => {
        if (err) return cb(err);
        return cb(null, res);
      }
    );
  }

  // store hash in database
  // takes in hash of password, compares against hash from database
  // get user's hash from database
  // comapare two hashes
  // return true or false
};

module.exports = passwords;
