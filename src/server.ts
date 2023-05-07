import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      break;
    case 'PUT':
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
