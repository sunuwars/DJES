const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const router = require("../src/router");
const supertest = require("supertest");
// add postData here?

tape("tape is working", t => {
  t.equals(1, 1, "one is one");
  t.end();
});

tape("test get data", t => {
  runDbBuild(err => {
    t.error(err, "No Error");
    supertest(router)
      .get("/testing")
      .expect(200)
      .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 200, "Should return 200");
        t.end();
      });
  });
});
