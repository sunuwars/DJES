/* eslint-disable */

const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");

test("Initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

test("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("JS file route returns a status code of 200", t => {
  supertest(router)
    .get("/script.js")
    .expect(200)
    .expect("Content-Type", /javascript/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("CSS file route returns a status code of 200", t => {
  supertest(router)
    .get("/style.css")
    .expect(200)
    .expect("Content-Type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("Favicon file route returns a status code of 200", t => {
  supertest(router)
    .get("/favicon.ico")
    .expect(200)
    .expect("Content-Type", /ico/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});
