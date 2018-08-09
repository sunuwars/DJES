const superRequest = require("request");
const fs = require("fs");
const path = require("path");

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
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
        console.log("public error");
      } else {
        // const ext = endpoint.split('.')[1];
        res.writeHead(200, {
          "Content-Type": contentType[path.extname(endpoint)]
        });
        res.end(file);
      }
    });
  },
  search(req, res) {
    // add some innards
  },
  requestItem() {
    // add some innards
  },
  addItem() {
    // add some innards
  }
};

module.exports = handlers;
