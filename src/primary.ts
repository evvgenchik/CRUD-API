import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

const workersArr: { pid: number; port: number }[] = [];

// cluster.setupPrimary({
//   exec: __dirname + '/server.ts',
// });

if (cluster.isPrimary) {
  for (let i = 0; i < cpuCount; i++) {
    const port = 5000 + i;
    const worker = cluster.fork({ port: port });
    workersArr.push({ pid: worker.process.pid!, port: port });
    worker.send(`Hello Worker ${worker.id}`);
    worker.on('message', function (message) {
      console.log(message);
    });
  }
} else if (cluster.isWorker) {
  import('./server.js');
}

cluster.on('exit', (worker) => {
  const deadPid = worker.process.pid;
  const deadPort = workersArr.find((el) => el.pid === deadPid);

  console.log(`worker ${deadPid} has been killed`);
  cluster.fork({ port: deadPort });
});
