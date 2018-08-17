const dbConnection = require("../database/db_connection");

const addLoan = (itemId, borrowerId, cb) => {
  dbConnection.query(
    `INSERT INTO loans (item_id, borrowers_id) VALUES ($1, $2)`,
    [itemId, borrowerId],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      dbConnection.query(
        `UPDATE items SET on_loan = TRUE WHERE items.id = $1`,
        [itemId],
        (err, res) => {
          if (err) {
            return cb(err);
          }
          return cb(null, res);
        }
      );
    }
  );
};

const checkUser = (email, cb) => {
  dbConnection.query(
    `SELECT id FROM users WHERE email=$1`,
    [email],
    (err, res) => {
      console.log('checkUser result: ', res);
      if (err) return cb(err);
      if (res.rowCount === 1) cb(null, res);
      else cb(null, false);
    }
  );
};

const postData = (name, email, itemId, cb) => {
  let borrowerId;
  checkUser(email, (err, res) => {
    if (err) return cb(err);
    else if (res) {
      borrowerId = res.rows[0].id;
      addLoan(itemId, borrowerId, cb);
    } else {
      dbConnection.query(
        `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`,
        [name, email],
        (err, res) => {
          if (err) {
            console.log(err);
            return cb(err);
          }
          borrowerId = res.rows[0].id;
          addLoan(itemId, borrowerId, cb);
        }
      );
    }
  });
};

const addItem = (name, description, lenderId, cb) => {
  console.log("add item reached");
  dbConnection.query(
    `INSERT INTO items (name, description, lender_id) VALUES ('${name}', '${description}', ${lenderId}) RETURNING id`,
    (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    }
  );
};

// Below function is for adding items (and new user if not already present)
// WET. MAY DRY EVENTUALLY
// params passed as arguments by handler/router
const insertData = (name, email, itemName, itemDesc, favColour, cb) => {
  console.log("reached insert data");
  let lenderId;
  dbConnection.query(
    `SELECT id FROM users WHERE email=$1`,
    [email],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      if (res.rowCount > 0) {
        console.log("user exists");
        lenderId = res.rows[0].id;
        addItem(itemName, itemDesc, lenderId, cb);
      } else {
        console.log("user doesnt exist");
        dbConnection.query(
          `INSERT INTO users (name, email, fav_colour) VALUES ($1, $2, $3) RETURNING id`,
          [name, email, favColour],
          (err, res) => {
            if (err) {
              return cb(err);
            }
            lenderId = res.rows[0].id;
            console.log(lenderId);
            // Need to update these
            addItem(itemName, itemDesc, lenderId, cb);
          }
        );
      }
    }
  );
};

module.exports = { postData, checkUser, insertData };
