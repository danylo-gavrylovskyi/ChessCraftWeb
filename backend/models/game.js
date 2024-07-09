const pool = require("../config/db");

const createGameTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      config JSON NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = createGameTable;
