const handlers = require("./handlers");

const router = (req, res) => {
  const endpoint = req.url.split("/")[1];

  if (endpoint === "") {
    handlers.home(req, res);
  } else if (endpoint.startsWith("search?q=")) {
    handlers.search(req, res, endpoint); // some arguments maybe
  } else if (endpoint === "register") {
    console.log("reached register");
    handlers.register(req, res);
  } else if (endpoint === "request-item") {
    handlers.requestItem(req, res);
  } else if (endpoint === "add-item") {
    console.log("add-item");
    handlers.addItem(req, res, endpoint); // some arguments
  } else if (endpoint === "populate-all") {
    console.log("populate");
    handlers.testData(req, res);
  } else if (endpoint === "success") {
    handlers.success(req, res);
  } else if (endpoint === "login") {
    handlers.login(req, res);
  }
  else if (endpoint === 'logout') {
    handlers.logout(req, res);
  } 
  else {
    handlers.public(req, res, endpoint);
  }
};

module.exports = router;
