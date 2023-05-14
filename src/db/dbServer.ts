import http from 'http';
import { usersDB } from '../utils/types.js';

let DB: usersDB = [];

const bdRequest = async () => {
  let DB: any[] = [];
  return new Promise((resolve, reject) => {
    http.get('http://localhost:4999', (res) => {
      res.setEncoding('utf8');

      res
        .on('data', (chunk) => {
          DB.push(chunk);

          res.on('end', () => {
            resolve(DB);
          });
        })
        .on('error', (err) => {
          console.log('Error: ');
        });
    });
  });
};
const bdPost = async (DB) => {
  const options = {
    port: 4999,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {});
  req.write(JSON.stringify(DB));
};

const dbServer = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.write(JSON.stringify(DB));
    res.end();
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    req.setEncoding('utf-8');
    DB.splice(0, DB.length);
    req.on('data', (chunk) => {
      const user = JSON.parse(chunk);
      // DB.push(user);
      DB = user;
    });

    req.on('end', () => {
      console.log('No more data');
    });
  }
});

export { bdRequest, bdPost, dbServer };
