const http = require('http');
require('dotenv').config();
const app = require('./app');
console.log('test');
const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/api/hiking`);
});
