import http from 'http';
import * as dotenv from 'dotenv';
import parser from './utils/parser.js';
import { UsersDB } from './utils/types.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const startPrimary = (workersArr: { workerPid: number; port: number }[]) => {
  const serverPrimary = http.createServer(async (req, res) => {
    const { url: path, method } = req;
    const currentWorker = workersArr.shift() as { workerPid: number; port: number };
    workersArr.push(currentWorker);

    const options = {
      port: currentWorker.port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const proxyReq = http.request(options, (response) => {
        response.setEncoding('utf8');
        const users = [] as UsersDB;
        response.on('data', (chunk) => {
          const user = JSON.parse(chunk);
          users.push(user);
        });
        response.on('end', () => {
          console.log(`Response received from the port: ${currentWorker.port}`);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(users));
          res.end();
        });
      });

      proxyReq.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });

      if (method === 'POST' || method === 'PUT') {
        const body = await parser(req);

        proxyReq.write(JSON.stringify(body));
      }

      proxyReq.end();
    } catch (err) {
      res.statusCode = 500;
      res.write(JSON.stringify({ message: 'Server error' }));
      res.end();
    }
  });

  serverPrimary.listen(PORT, () => {
    console.log(`PRIMARY SERVER START ON ${PORT}`);
  });
};

export default startPrimary;
