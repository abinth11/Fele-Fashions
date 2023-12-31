import express, { Application, NextFunction } from 'express';
import http from 'http';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import redisConnect from './frameworks/databases/redis/connection';
import colors from 'colors';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/error-handler';
import AppError from './utils/app-error';
import swaggerDocs from './adapters/docs/config';
import ENV_CONFIG from './config';

colors?.enable();

const app: Application = express();
const server = http.createServer(app);

//* connection to redis
const redisClient = redisConnect().createRedisClient();

//* express config connection
expressConfig(app);

//* routes for each endpoint
routes(app, redisClient);

//* swagger docs
swaggerDocs(app,ENV_CONFIG.PORT);


//* handles server side errors
app.use(errorHandlingMiddleware);

//* catch 404 and forward to error handler
app.all('*', (req, res, next: NextFunction) => {
  next(new AppError('Not found', 404));
});

//* starting the server with server config
serverConfig(server).startServer();

export type RedisClient = typeof redisClient;