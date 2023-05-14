import http from 'http';
import parser from './utils/parser.js';

export const startPrimary = (workersArr: { pid: number; port: number }[]) => {
  const serverPrimary = http.createServer(async (req, res) => {
    const { url: path, method, headers } = req;
    const currentWorker = workersArr.shift() as { pid: number; port: number };
    workersArr.push(currentWorker);
    console.log(currentWorker.port);

    const options = {
      port: 4001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const proxyReq = http.request(options, (response) => {
        response.setEncoding('utf8');
        const users = [] as any[];
        response.on('data', function (chunk) {
          const user = JSON.parse(chunk);
          users.push(user);
        });
        response.on('end', function () {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(users));
          res.end();
        });
      });

      proxyReq.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });

      if (method === 'POST') {
        const body = await parser(req);

        proxyReq.write(JSON.stringify(body));
        proxyReq.end();
      }

      proxyReq.end();
    } catch (err) {
      res.statusCode = 500;
      res.write(JSON.stringify({ message: 'Server error' }));
      res.end();
    }
  });

  serverPrimary.listen(4000, () => {
    console.log(`PRIMARY SERVER START ON 4000`);
  });
};
