import http from 'http';
import app from './app.js';
import { checkDatabaseConnection } from './db/index.js';

const server = http.createServer(app);
const port = 3000;
app.set('port', port);

server.on('error', errorHandler);
server.on('listening', () => {
  console.log('Listening on ' + port);
});

/**
 * Ensures the database is reachable before booting the HTTP server.
 * @returns {Promise<void>}
 */
async function startServer() {
  try {
    // Check DB connexion before start
    await checkDatabaseConnection();

    server.listen(port);
  } catch (err) {
    console.error('Failed to start server due to DB error:', err);
    process.exit(1);
  }
}

startServer();

/**
 * Logs and exits on port binding issues.
 * @param {NodeJS.ErrnoException} error Error emitted by the HTTP server.
 * @returns {never}
 */
function errorHandler(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = 'port: ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
}