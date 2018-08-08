const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 4002;

server.listen(port, () => {
  console.log(`Sweet sweet music happens on port ${port}`);
});