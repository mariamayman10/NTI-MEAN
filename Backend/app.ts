import express from 'express';
import cors from 'cors';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import database from './config/database';
import { appRoutes } from './routes';
import { Server } from 'http';

// create app
const app:express.Application = express();
// read .env
dotenv.config();
// enable parsing of JSON-formatted request bodies
app.use(express.json({limit: '10kb'}));
app.use(cors({
    origin: ['http://localhost:3001', ''],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(compression());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ['price', 'category', 'subcategory', 'ratingAverage', 'sold'] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
// serve static access to images
app.use(express.static('uploads'))
// load database
database();
// include the routes of the app
appRoutes(app);
// specify port to listen
let server: Server;
server = app.listen(process.env.PORT);

process.on('unhandledRejection', (err:Error) => {
    console.error(`unhandledRejection: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('Shutting down the app');
        process.exit(1);
    })
});

