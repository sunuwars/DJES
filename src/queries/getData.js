const databaseConnection = require('../database/db_connection.js');

// qry is the db query we want to make
const getData = (cb) => {
    databaseConnection.query('SELECT * FROM users', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows)
        }
    });
};



module.exports = getData;