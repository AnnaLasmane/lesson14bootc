import express from 'express';

import dotenv from 'dotenv';

import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import taskRoutes from './routes/tasks.js';



dotenv.config();

const server = express();
server.use(bodyParser.json());
server.use('/tasks', taskRoutes);




mongoose.connect(
    process.env.MONGOOSE_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.error(`Could not connect to database: ${err}`);
            return;
        }
        console.error(`Database is up and running`);
    });
server.get('/', (req, res) => {
    res.send('Hello world');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is up and running ${process.env.PORT}`);
});