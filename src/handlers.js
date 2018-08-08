const superRequest = require('request');
const fs = require('fs');
const path = require('path');

const buildPath = function (myPath) {
  return path.join(__dirname, "..", "public", myPath);
};

contentType = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".ico": "icon/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif"
}

const handlers = {

  home: function (req, res) {
    fs.readFile(buildPath('index.html'), (err, file) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Server Error</h1>');
        console.log("home error")
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
      }
    })
  },

  public: function (req, res, endpoint) {
    fs.readFile(buildPath(endpoint), (err, file) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Server Error</h1>');
        console.log("public error");
      } else {
        // const ext = endpoint.split('.')[1];
        console.log("ext: ", path.extname(endpoint));
        res.writeHead(200, { 'Content-Type': contentType[path.extname(endpoint)] });
        res.end(file);
      }
    })
    // add some innards
  },
  search: function (req, res) {
    // add some innards



  },
  requestItem: function () {
    // add some innards
  },
  addItem: function () {
    // add some innards
  }

}

module.exports = handlers;
