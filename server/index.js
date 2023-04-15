import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {URL} from './config/dev.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRouter);

mongoose
    .connect(URL)
    .then(() => app.listen(PORT, () => console.log(`mongoDB connect port:${PORT}`)))
    .catch(error => console.log(error));
