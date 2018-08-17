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

  comparePassword: (plaintext, hash, cb) => {
    bcrypt.compare(plaintext, hash, (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    });
  },

  // store hash in database
  storePassword: (name, email, favColour, hashedPassword, cb) => {
    dbConnection.query(
      `INSERT INTO users (name, email, fav_colour, password_hash) VALUES ($1, $2, $3, $4)`,
      [name, email, favColour, hashedPassword],
      // `INSERT INTO users (name, email, fav_colour, password_hash) VALUES ('${name}', '${email}', '${favColour}', '${hashedPassword}')`,
      // `INSERT INTO users (name, email, fav_colour, password_hash) VALUES ('Joe', 'Joe@dom.dom', '0947dd', '$2b$12$9KMMDuR2Le5n1.tl1LYqOuVCRXjwpIRfj0RafQa/mppqgNTD7.P8u')`,
      (err, res) => {
        if (err) return cb(err);
        return cb(null, res);
      }
    );
  },

  storeSession: (sessionID, email, cb) => {
    console.log("session ID: ", sessionID);
    passwords.deletePreviousSession(email, (err, res) => {
      if (err) return cb(err);
      dbConnection.query(
        `INSERT INTO active_sessions (session_id, email) VALUES ($1, $2)`,
        [sessionID, email],
        (err, res) => {
          if (err) return cb(err);
          return cb(null, res, sessionID);
        }
      );
    });
  },

  deletePreviousSession: (email, cb) => {
    dbConnection.query(
      `DELETE FROM active_sessions WHERE email=$1`,
      [email],
      (err, res) => {
        if (err) return cb(err);
        return cb(null, res);
      }
    );
  },

  checkSession: (sessionId, cb) => {
    dbConnection.query(
      `SELECT session_id FROM active_sessions WHERE session_id=$1`,
      [sessionId],
      (err, res) => {
        console.log("session: ", res);
        if (err) return cb(err);
        return cb(null, res.rows);
      }
    );
  }

  // takes in hash of password, compares against hash from database
  // get user's hash from database
  // comapare two hashes
  // return true or false
};

module.exports = passwords;
