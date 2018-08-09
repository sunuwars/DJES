const handlers = require("./handlers");

const router = (req, res) => {
  const endpoint = req.url.split("/")[1];

  if (endpoint === "") {
    handlers.home(req, res);
  } else if (endpoint.includes("search?q=")) {
    handlers.search(req, res, endpoint); // some arguments maybe
  } else if (endpoint === "request-item") {
    handlers.requestItem(req, res);
  } else if (endpoint === "add-item") {
    handlers.addItem(); // some arguments
  } else if (endpoint === "testing") {
    handlers.testData(req, res);
  } else if (endpoint === "success") {
    handlers.success(req, res);
  } else {
    handlers.public(req, res, endpoint);
  }
};

module.exports = router;
