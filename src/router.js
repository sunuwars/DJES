const handlers = require("./handlers");

const router = (req, res) => {
  const endpoint = req.url.split("/")[1];

  if (endpoint === "") {
    handlers.home(req, res);
  } else if (endpoint === "search") {
    handlers.search(req, res); // some arguments maybe
  } else if (endpoint === "request-item") {
    handlers.requestItem(req, res);
  } else if (endpoint === "add-item") {
    handlers.addItem(); // some arguments
  } else if (endpoint === "success") {
    handlers.success(req, res);
  } else {
    handlers.public(req, res, endpoint);
  }
};

module.exports = router;
