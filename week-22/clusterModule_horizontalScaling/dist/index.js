"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const totalCPUs = os_1.default.cpus().length;
const PORT = 3000;
if (cluster_1.default.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running ........`);
    //fork workers
    for (let i = 0; i < totalCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died 💀`);
        console.log("Let's fork another worker");
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    console.log(`Worker ${process.pid} started 🟢`);
    app.get('/', (req, res) => {
        res.send('hello world!');
    });
    app.get('/api/:n', (req, res) => {
        let n = parseInt(req.params.n);
        let count = 0;
        if (n > 5000000000000)
            n = 5000000000000;
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
