const fs = require("fs");

const dbConnection = require("./db_connection");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = cb => {
  dbConnection.query(sql, (err, res) => {
    if (err) throw err;
    // console.log("Tables created with result:", res);
    cb(null, res);
  });
};

module.exports = runDbBuild;
