import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from 'cors'
import packageController from './controllers/package';
import deliveryController from './controllers/delivery';
import {socketServer} from '../src/websocket.server'
import * as http from 'http';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

const server: http.Server = http.createServer(app);

const prefix = '/api'

app.use(cors({
    origin: "*"
  }));

app.use(bodyParser.json());

const MONGO_URI:any = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

socketServer(server);

app.get('/', (req, res) => {
  res.send('Welcome to Gozem package delivery API by Chibuike Vincent!');
});

app.use(`${prefix}/package`, packageController);
app.use(`${prefix}/delivery`, deliveryController);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

