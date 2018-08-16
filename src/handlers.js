const fs = require("fs");
const path = require("path");
const { postData, checkUser, insertData } = require("./queries/postData");
const getData = require("./queries/getData");
const runDbBuild = require("./database/db_build");
const passwords = require("./passwords");
const querystring = require("querystring");
const crypto = require("crypto");

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

const sessionIDGen = function(length = 24){
  return new Promise((resolve, reject) => {
      crypto.randomBytes(48, (err, buffer) => {
          if (err) {
              reject(err);
          } else {
              resolve (buffer.toString("hex"))
          }
      })
  })
}

const handlers = {
  collectData(req, cb) {
    let data = "";
    console.log("req: ", req);
    req
      .on("data", chunk => {
        console.log("chunk: ", chunk);
        data += chunk;
      })
      .on("error", err => {
        cb(err);
      })
      .on("end", () => {
        cb(null, querystring.parse(data))
        // cb(null, JSON.parse(data));
      });
  },

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

  register(req, res) {
    if (req.method === "POST") {
      handlers.collectData(req, (err, data) => {
        console.log("collected data");
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>Server Error</h1>");
        } else if (
          !data["reg-name"] ||
          !data["reg-email"] ||
          !data["reg-password"] ||
          !data["fav-colour"]
        ) {
          console.log("data missing");
          console.log("data: ", data);
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>Server Error</h1>");
        } else {
          console.log(data);
          // sanitise data
          const name = data["reg-name"].replace(/[^a-z0-9_\- ]/gi, "");
          const email = data["reg-email"].replace(/[^a-z0-9._\-@+]/gi, "");
          const password = data["reg-password"];
          const favColour = data["fav-colour"]
            .replace(/[^a-z0-9]/gi, "")
            .substring(0, 6);
          // check email doesn't exist
          checkUser(email, (err, result) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/html" });
              res.end("<h1>Server Error</h1>");
            } else if (result) {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end("<h1>Email already exists</h1>");
            } else {
              passwords.hashPassword(password, (err, hashedPassword) => {
                if (err) {
                  res.writeHead(500, { "Content-Type": "text/html" });
                  res.end("<h1>Hashed pw error</h1>");
                }
                passwords.storePassword(
                  name,
                  email,
                  favColour,
                  hashedPassword,
                  (err, result) => {
                    if (err) {
                      res.writeHead(500, { "Content-Type": "text/html" });
                      res.end("<h1>Server Error in storepassword func</h1>");
                    }

                    // Create session token!
                    sessionIDGen()
                    .then(
                      sessionID => {
                        passwords.storeSession(
                      sessionID,
                      email, 
                      (err, result, sssionID) => {
                        console.log("Store Session func reached")
                        if (err) {
                          res.writeHead(500, { "Content-Type": "text/html" });
                          res.end("<h1>Server Error in storeSession func</h1>");
                        } else {
                          res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": `session_id=${sssionID}; HttpOnly; Max-Age=43200` }) 
                          res.end("<h1>User added to database :)</h1>")
                        }
                      } 
                    )}
                  )
                  // .then(
                  //   (sessID) => { 
                  //     res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": `session_id='${sessID}'` }) 
                  //     res.end("<h1>User added to database :)</h1>")
                  //   } 
                  // )
                  // .then()
                    // create cookie
                    // store session data
                    // all that jazz
                    
                    
                  }
                );
              });
            }
          });
          // hash password
          // store user
        }
      });
    }
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
      handlers.collectData(req, (err, data) => {
        const parsedData = JSON.parse(data);
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
  addItem(req, res) {
    // SQL query: Add user
    // SQL query: Add item from that user
    console.log("addItem reached");
    if (req.method === "POST") {
      let data = "";
      req
        .on("data", chunk => {
          data += chunk;
        })
        .on("end", () => {
          const parsedData = JSON.parse(data);
          console.log("got data");
          // Previously used parsedData.data.name etc below
          insertData(
            parsedData.name,
            parsedData.email,
            parsedData.itemName,
            parsedData.itemDesc,
            parsedData.favColour,
            err => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/html" });
                res.end("<h1>Server Error</h1>");
                console.log("insertdata error");
              } else {
                //need to change location?
                console.log("else, should be 302");
                res.writeHead(302, { Location: "/success" });
                res.end();
              }
            }
          );
        });
    }
  },

  testData(req, response) {
    // runDbBuild((err, res) => {
    //   if (err) {
    //     response.writeHead(500, "Content-Type:text/html");
    //     response.end("<h1>Sorry, there was a problem getting the users</h1>");
    //     console.log(err);
    //   } else {
    getData("", (err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem getting the users</h1>");
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(res));
    });
    //   }
    // });
  }
};

module.exports = handlers;
