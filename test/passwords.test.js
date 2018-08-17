const tape = require("tape");
const passwords = require("../src/passwords");

tape("password: tape is working", t => {
  t.equals(1, 1, "one should equal one");
  t.end();
});

tape("hash function works", t => {
  passwords.hashPassword("qwerty", (err, hash) => {
    t.error(err, "No error");
    t.equal(
      hash.length,
      60,
      "hash function should return string of 60 characters"
    );
    t.end();
  });
});

tape("password is stored in database", t => {
  passwords.hashPassword("qwerty", (err, hash) => {
    t.error(err, "No error");
    passwords.storePassword(
      "joe",
      "joe@joe.com",
      "000000",
      hash,
      (err, res) => {
        t.error(err, "No error");
        t.equal(res.rowCount, 1, "storePassword should return true");
        t.end();
      }
    );
  });
});
