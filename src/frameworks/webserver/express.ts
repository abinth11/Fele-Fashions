import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import configKeys from '../../config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, 
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => {
    const xRealIp = req.headers['x-real-ip'];
    return xRealIp ? String(xRealIp) : req.ip;
  }
});

const expressConfig = (app: Application) => {
  // Development logging
  if (configKeys.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.set('trust proxy', true); // Enable trust for X-Forwarded-* headers
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(limiter);
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        imgSrc: ["'self'", 'data:'],
        frameSrc: ["'self'", 'https:']
      }
    })
  );
};

export default expressConfig;