import http from 'http';
import app from './app.js';

const server = http.createServer(app);
const port = 3000;
app.set('port', port);

server.on('error', errorHandler);
server.on('listening', () => {
    console.log('Listening on ' + port);
});
server.listen(port);

function errorHandler(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = 'port: ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}