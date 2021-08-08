import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//import bodyParser from 'body-parser';
import path from 'path';
import log4js from 'log4js';
import compression from 'compression';
import cors from 'cors';

import routes from './routes/routes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve(path.dirname(''));
const PORT = process.env.PORT || 4000;
const DB_CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@bluewhale.dky6n.mongodb.net/${process.env.DB_NAME}`;

app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

log4js.configure({
    appenders: {
        FileErr: {
            type: 'file',
            filename: 'logs/error.log',
            maxLogSize: 10485760,
            compress: true,
        },
        FileWarn: {
            type: 'file',
            filename: 'logs/warn.log',
            maxLogSize: 10485760,
            compress: true,
        },
        Consola: { type: 'console' },
    },
    categories: {
        default: { appenders: ['Consola'], level: 'info' },
        Error: { appenders: ['FileErr'], level: 'error' },
        Warn: { appenders: ['FileWarn'], level: 'warn' },
    },
});

const logger = log4js.getLogger('default');

try {
    mongoose
        .connect(
            DB_CONNECTION_URL,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            },
            logger.info('Application connected to DB')
        )
        .then(() => {
            app.listen(PORT, logger.info(`Running on port ${PORT}`));
        });
} catch (error) {
    logger.error(err);
}
