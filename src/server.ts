import http from 'http';
import * as dotenv from 'dotenv';
import getRequest from './methods/get.js';
import postRequest from './methods/post.js';
import users from './data/data.json' assert { type: 'json' };
import putRequest from './methods/put.js';
dotenv.config();

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      getRequest(req, res);
      break;
    case 'POST':
      postRequest(req, res);
      break;
    case 'PUT':
      putRequest(req, res);
      break;
    case 'DELETE':
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ title: 'Not found', message: 'Route not found' }));
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`SERVER START ON ${PORT}`);
});
