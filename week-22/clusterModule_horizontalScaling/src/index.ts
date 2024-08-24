import express from 'express';
import cluster from 'cluster';
import os from 'os';

const totalCPUs = os.cpus().length;

const PORT = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running ........`);

  //fork workers
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died 💀`);
    console.log("Let's fork another worker");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started 🟢`);

  app.get('/', (req, res) => {
    res.send('hello world!');
  });

  app.get('/api/:n', (req, res) => {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000000) n = 5000000000000;

    for (let i = 0; i < n; i++) {
      count += i;
    }
    console.log(`Current o/p is from process ${process.pid}`);
    res.send(`Final count is ${count} and process is ${process.pid}`);
  });

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
}
