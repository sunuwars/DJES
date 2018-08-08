const superRequest = require('request');
const fs = require('fs');
const path = require('path');

const buildPath = function (myPath) {
  return path.join(__dirname, "..", "public", myPath);
};

contentType = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ico: "icon/x-icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif"
}

const handlers = {

  home: function (req, res) {
    console.log('running handlers.home');
    fs.readFile(buildPath('index.html'), (err, file) => {
      if (err) {
        res.writeHead(500, { 'Content-Type' : 'text/html' });
        res.end('<h1>Server Error</h1>');
      } else {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(file);
      }
    })

  },
  public: function () {
    // add some innards
  },
  search: function () {
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
