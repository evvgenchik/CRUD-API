import http from 'http';
import * as dotenv from 'dotenv';
import getRequest from './methods/get.js';
import postRequest from './methods/post.js';
import putRequest from './methods/put.js';
import deleteRequest from './methods/delete.js';
import { usersDB } from './utils/types.js';
dotenv.config();
import cluster from 'cluster';
import os from 'os';

const cpuCount = os.cpus().length;

const workersArr: { pid: number; port: number }[] = [];
const PORT = process.env.PORT || 5001;

const DB: usersDB = [
  // {
  //   username: 'zxc',
  //   age: 23,
  //   hobbies: ['code', 'gym'],
  //   id: '4934517f-2978-4acd-b36c-9ecc2df06302',
  // },
  // {
  //   username: 'zxczcxzcxzxczxcz',
  //   age: 23,
  //   hobbies: ['code', 'gym'],
  //   id: '05d10bee-173f-421c-a91d-d64b70bcc55b',
  // },
];

export const server = http.createServer((req, res) => {
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

// if (cluster.isPrimary) {
//   for (let i = 0; i < cpuCount; i++) {
//     const port = +PORT + i;
//     const worker = cluster.fork({ PORT: port });
//     workersArr.push({ pid: worker.process.pid!, port: port });
//     // worker.send(`Hello Worker ${worker.id}`);
//     // worker.on('message', function (message) {
//     //   console.log(message);
//     // });
//     worker.on('listening', function (message) {
//       console.log(message);
//     });
//   }
// } else if (cluster.isWorker) {
//   server.listen(PORT, () => {
//     //console.log(`SERVER START ON ${'dop PORT'}`);
//     // process.on('message', (msg) => {
//     //   console.log(`Message from master: ${msg}`);
//     // });
//     console.log(`SERVER START ON ${PORT}`);

//     if (process.send) {
//       process.send('hello from worker with id: ');
//     }
//   });
// } else {
//   server.listen(PORT, () => {
//     console.log(`SERVER START ON ${PORT}`);
//   });
// }
server.listen(PORT, () => {
  console.log(`SERVER START ON ${PORT}`);
});
