import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const db = mysql.createConnection({
    host: process.env.LDB_HOST,
    user: process.env.LDB_USER,
    password: process.env.LDB_PASSWORD,
    database: process.env.LDB_DATABASE
})

db.connect((err) => {
  //console.log(process.env.DB_HOST  , process.env.DB_USER)
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

export default db;