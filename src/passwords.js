const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const passwords = {
  // takes in plaintext password and salt, hashes it, stores it in database
  // hash plaintext password
  hashPassword: (plaintext, cb) =>
    bcrypt.hash(plaintext, SALT_ROUNDS, cb, (err, hash) => {
      if (err) return cb(err);
      return cb(null, hash);
    })

  // store hash in database
  // takes in hash of password, compares against hash from database
  // get user's hash from database
  // comapare two hashes
  // return true or false
};

module.exports = passwords;
