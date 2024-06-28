import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'sgroup',
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
        }


    }
    console.log("vo day ne");
    
    if (connection) connection.release();
    
    return;
    }
);
export default pool;