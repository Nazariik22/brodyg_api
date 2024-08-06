import express from 'express';
import router from './Router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbName = 'apiDbSql.db';
const db = new sqlite3.Database(dbName);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', router);

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL
  );
`;

db.run(createUsersTable, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table "users" created or already exists.');
  }
});
app.post('/', (req, res) => {
    console.log('Все ок');
    res.status(200).json({ message: "Все ок" });
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
