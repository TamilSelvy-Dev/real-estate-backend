const { Pool } = require("pg");
require("dotenv").config();

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test function
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully");
    client.release(); // release connection back to pool
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };