const fs = require("fs");
const path = require("path");
const postData = require("./queries/postData");
const querystring = require("querystring");

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
  requestItem(req, res) {
    if (req.method === "POST") {
      let data = "";
      req
        .on("data", chunk => {
          data += chunk;
        })
        .on("end", () => {
          const parsedData = JSON.parse(data);
          postData(
            parsedData.data.name,
            parsedData.data.email,
            parsedData.data.item,
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
  }
};

module.exports = handlers;
