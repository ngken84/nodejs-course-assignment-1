import * as http from 'http';
import { requestHandler } from './router';

const server = http.createServer(requestHandler);

server.listen(3000);