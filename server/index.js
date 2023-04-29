import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {URL} from './config/dev.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routes/users.js';
import roleRouter from './routes/roles.js';

const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/role', roleRouter);

mongoose.set('strictQuery', false);

mongoose
    .connect(URL)
    .then(() => app.listen(PORT, () => console.log(`mongoDB connect port:${PORT}`)))
    .catch(error => console.log(error));
