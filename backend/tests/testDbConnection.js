const pool = require("../config/db");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    pool.end();
  }
}

testConnection();
