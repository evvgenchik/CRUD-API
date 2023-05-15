import { IncomingMessage } from 'http';

const parser = (req: IncomingMessage) => {
  return new Promise((res, rej) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('error', (err) => {
      rej(err);
    });
    req.on('end', () => {
      res(JSON.parse(data));
    });
  });
};

export default parser;
