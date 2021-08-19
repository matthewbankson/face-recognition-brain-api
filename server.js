import express, { response } from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
});

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  handleApiCall(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
