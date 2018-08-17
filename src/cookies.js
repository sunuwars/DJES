const dbConnection = require("./database/db_connection");

const cookies = {

  getUserDetails: (req, cb) => {
    const sessionId = req.headers.cookie.split('=')[1];
    dbConnection.query(
      `SELECT users.name, users.email 
      FROM users INNER JOIN active_sessions 
      ON users.email = active_sessions.email 
      WHERE active_sessions.session_id = $1`, [sessionId],
      (err, res) => {
        if (err) {
          console.log(err);
        } 
        if (res.rows[0].length < 1) {
          console.log('cookie not valid');
        }
        else {
          return cb(null, res.rows[0]);
        }
        
      }
    )
  }
}

module.exports = cookies;