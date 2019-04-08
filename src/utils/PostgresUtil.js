const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
    user: "chatapp",
   host: "localhost",
   database: "postgres",
   password: "student",
   port: "5432"
})

module.exports = {
  pool,
}
