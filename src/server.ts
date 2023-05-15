import http from 'http';
import * as dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import getRequest from './methods/get.js';
import postRequest from './methods/post.js';
import putRequest from './methods/put.js';
import deleteRequest from './methods/delete.js';
import errorsMsg from './utils/errorsMsg.js';
import startPrimary from './primaryServer.js';
import { bdRequest, bdPost, dbServer } from './db/dbServer.js';

dotenv.config();

const workersArr: { workerPid: number; port: number }[] = [];
const PORT = process.env.PORT || 5001;
const { pid } = process;
const cpusLength = os.cpus().length;

const server = http.createServer(async (req, res) => {
  const dbJson = (await bdRequest()) as string;
  const DB = JSON.parse(dbJson);

  try {
    switch (req.method) {
      case 'GET':
        await getRequest(req, res, DB);
        break;
      case 'POST':
        await postRequest(req, res, DB);
        bdPost(DB);
        break;
      case 'PUT':
        await putRequest(req, res, DB);
        bdPost(DB);
        break;
      case 'DELETE':
        await deleteRequest(req, res, DB);
        bdPost(DB);
        break;
      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: errorsMsg.path }));
        res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.write(JSON.stringify({ message: 'Server error' }));
    res.end();
  }
});

if (process.env.MULTI) {
  if (cluster.isPrimary) {
    for (let i = 0; i < cpusLength; i++) {
      const port = +PORT + i + 1;
      const worker = cluster.fork({ PORT: port });
      const workerPid = worker.process.pid as number;
      workersArr.push({ workerPid, port });
    }

    workersArr.sort((a, b) => a.port - b.port);
    dbServer.listen(4999, () => {
      console.log(`DB SERVER START ON 4999`);
    });
    startPrimary(workersArr);
  } else if (cluster.isWorker) {
    console.log(`Child pid: ${pid}`);
    server.listen(PORT, () => {
      console.log(`SERVER START ON ${PORT}`);
    });
  }
} else {
  dbServer.listen(4999, () => {
    console.log(`DB SERVER START ON 4999`);
  });
  server.listen(PORT, () => {
    console.log(`SERVER START ON ${PORT}`);
  });
}

process.on('SIGINT', () => {
  server.close(() => process.exit());
  dbServer.close(() => process.exit());
});

export default server;
