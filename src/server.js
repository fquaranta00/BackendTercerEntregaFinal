import http from 'http';

import config from '../src/config/config.js';
import app from './app.js';
import { init as initMongoDB } from './db/mongodb.js'; // Cambia el nombre de la función a initMongoDB
// Inicializa la conexión con MongoDB
await initMongoDB();
// Inicializa el servidor HTTP
const server = http.createServer(app);
const PORT = config.port;
// console.log(config.port);
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${config.port}/`);
});

