require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to Azure SQL Database');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed', err);
  });

async function query(query, params = {}) {
  const pool = await poolPromise;
  const request = pool.request();

  for (const [key, { type, value }] of Object.entries(params)) {
    request.input(key, type, value);
  }

  return request.query(query);
}

module.exports = {
  sql,
  query,
};