import mysql from 'mysql2/promise';

export const conn = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});