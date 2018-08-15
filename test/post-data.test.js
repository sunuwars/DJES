/* eslint-disable */

const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");
const querystring = require("querystring");
const runDbBuild = require("../src/database/db_build");

test("Initialise post-data tests", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

test("Post request returns a status code of 302", t => {
  runDbBuild((err, res) => {
    t.error(err, "No error");

    let data = {
      name: "anon",
      email: "sang@gmail.com",
      item: "5"
    };
    supertest(router)
      .post("/request-item")
      .send(data)
      .expect(302)
      .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 302, "Should return 302");
        t.end();
      });
  });
});

test("Post request returns a status code of 302", t => {
  runDbBuild((err, res) => {
    t.error(err, "No error");
    let data = {
      name: "anon",
      email: "sang@gmail.com",
      itemName: "Scary thing",
      itemDesc: "Super spooky"
    };
    supertest(router)
      .post("/add-item")
      .send(data)
      .expect(302)
      .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 302, "Should return 302");
        t.end();
      });
  });
});
