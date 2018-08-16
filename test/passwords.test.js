const tape = require("tape");
const passwords = require("../src/passwords");

tape("password: tape is working", t => {
  t.equals(1, 1, "one should equal one");
  t.end();
});

tape("hash function works", t => {
  passwords.hashPassword("password123", (err, hash) => {
    t.error(err);
    t.equal(
      hash.length,
      60,
      "hash function should return string of 60 characters"
    );
    t.end();
  });
});
