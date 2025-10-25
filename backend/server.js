const app = require('./app');

// Trigger redeploy
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
console.log('Starting server on', HOST, 'port', PORT);
const server = app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
    console.log('Server started successfully');
}); server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

server.on('listening', () => {
    console.log('Server is now listening');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});