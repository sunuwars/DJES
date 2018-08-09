const databaseConnection = require("../database/db_connection.js");

// qry is the db query we want to make
const getData = (qry, cb) => {
  databaseConnection.query(
    `SELECT users.name, users.fav_colour, items.name, items.id, items.description 
    FROM items 
    INNER JOIN users 
    ON items.lender_id = users.id 
    WHERE lower(items.name) LIKE '%${qry}%' OR lower(items.description) LIKE '%${qry}%'`,
    (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res.rows);
    }
  );
};

module.exports = getData;
