/* eslint-disable */

const fs = require("fs");
const path = require("path");
const postData = require("./queries/postData");

const getData = require("./queries/getData");

const buildPath = function(myPath) {
  return path.join(__dirname, "..", "public", myPath);
};

const contentType = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".ico": "icon/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif"
};

const handlers = {
  home(req, res) {
    fs.readFile(buildPath("index.html"), (err, file) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
        console.log("home error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(file);
      }
    });
  },

  public(req, res, endpoint) {
    fs.readFile(buildPath(endpoint), (err, file) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Page not found</h1>");
        console.log("public error");
      } else {
        res.writeHead(200, {
          "Content-Type": contentType[path.extname(endpoint)]
        });
        res.end(file);
      }
    });
  },

  search(req, res, endpoint) {
    const qry = decodeURIComponent(endpoint.split("?q=")[1])
      .replace(/[^A-Za-z0-9 ]/, "")
      .toLowerCase();
    getData(qry, (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
        console.log("search error");
      } else {
        res.writeHead(200, "Content-type: application/json");
        res.end(JSON.stringify(result));
       }
    });
  },
  requestItem(req, res) {
    if (req.method === "POST") {
      let data = "";
      req
        .on("data", chunk => {
          data += chunk;
        })
        .on("end", () => {
          const parsedData = JSON.parse(data);
          console.log(parsedData.name, parsedData.email, parsedData.item);
          postData(
            parsedData.name,
            parsedData.email,
            Number(parsedData.item),
            err => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/html" });
                res.end("<h1>Server Error</h1>");
                console.log("postdata error");
              } else {
                res.writeHead(302, { Location: "/success" });
                res.end();
              }
            }
          );
        });
    }
  },
  success(req, res) {
    fs.readFile(buildPath("success.html"), (err, file) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
        console.log("home error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(file);
      }
    });
  },
  addItem() {
    // add some innards
  },

  testData: function(req, response) {
    getData("", (err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem getting the users</h1>");
        console.log(err);
      } else {
        let output = JSON.stringify(res);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(output);
      }
    });
  }
};

module.exports = handlers;
