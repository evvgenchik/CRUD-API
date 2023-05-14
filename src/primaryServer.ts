import http from 'http';
import parser from './utils/parser.js';

export const serverPrimary = http.createServer(async (req, res) => {
  const { url, method } = req;
  const options = {
    port: 4001,
    path: url,
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const proxyReq = http.request(options, (response) => {
      response.setEncoding('utf8');
      const users = [] as any[];
      response.on('data', function (chunk) {
        users.push(chunk);
      });
      response.on('end', function () {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ user: users }));
        res.end();
      });
    });

    proxyReq.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    if (method === 'POST') {
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
