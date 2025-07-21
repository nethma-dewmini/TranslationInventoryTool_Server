require('dotenv').config();

const connectDB = require('./src/config/db');
const { port } = require('./src/config/config');
const app = require('./src/app');
const http = require('http');

const server = http.createServer(app);

async function startServer() {
    await connectDB();

    require('./cron');

    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    process.once('SIGUSR2', () => {
        server.close(() => process.kill(process.pid, 'SIGUSR2'));
    });

    process.on('SIGINT', () => {
        server.close(() => process.exit(0));
    });
}

startServer().catch(err => {
    console.error('Server failed to start:', err);
    process.exit(1);
});