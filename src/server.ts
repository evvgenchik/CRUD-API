import http from 'http';
import * as dotenv from 'dotenv';
import getRequest from './methods/get.js';
import postRequest from './methods/post.js';
import putRequest from './methods/put.js';
import deleteRequest from './methods/delete.js';
import { usersDB } from './utils/types.js';
dotenv.config();

const PORT = process.env.PORT || 5001;

const DB: usersDB = [
  {
    username: 'zxc',
    age: 23,
    hobbies: ['code', 'gym'],
    id: '4934517f-2978-4acd-b36c-9ecc2df06302',
  },
  {
    username: 'zxczcxzcxzxczxcz',
    age: 23,
    hobbies: ['code', 'gym'],
    id: '05d10bee-173f-421c-a91d-d64b70bcc55b',
  },
];

const server = http.createServer((req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        getRequest(req, res, DB);
        break;
      case 'POST':
        postRequest(req, res, DB);
        break;
      case 'PUT':
        putRequest(req, res, DB);
        break;
      case 'DELETE':
        deleteRequest(req, res, DB);
        break;
      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ title: 'No such endpoint', message: 'Route not found' }));
        res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.write(JSON.stringify({ message: 'Server error' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`SERVER START ON ${PORT}`);
});
