import sqlite3 from 'sqlite3';

const dbName = 'apiDbSql.db';
const db = new sqlite3.Database(dbName);

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
    db.close();
});
