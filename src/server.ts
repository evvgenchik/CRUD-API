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
import errorsMsg from './utils/errorsMsg.js';
import { startPrimary } from './primaryServer.js';
import { bdRequest, bdPost, dbServer } from './db/dbServer.js';

const cpuCount = os.cpus().length;

const workersArr: { pid: number; port: number }[] = [];
const PORT = process.env.PORT || 5001;
const pid = process.pid;

export const server = http.createServer(async (req, res) => {
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
        console.dir(DB);
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
    for (let i = 0; i < 3; i++) {
      const port = +PORT + i + 1;
      const worker = cluster.fork({ PORT: port });
      workersArr.push({ pid: worker.process.pid!, port: port });
    }

    workersArr.sort((a, b) => a.port - b.port);
    startPrimary(workersArr);

    dbServer.listen(4999, () => {
      console.log(`DB SERVER START ON 4999`);
    });
  } else if (cluster.isWorker) {
    console.log(`Child pid: ${pid}`);
    server.listen(PORT, () => {
      console.log(`SERVER START ON ${PORT}`);
    });
  }
} else {
  server.listen(PORT, () => {
    console.log(`SERVER START ON ${PORT}`);
  });
}
