const pool = require("../config/db");
const fetch = require("node-fetch");

exports.createGame = async (req, res, next) => {
  const { name, config } = req.body;
  const userId = req.userData.id;

  try {
    const result = await pool.query(
      "INSERT INTO games (name, config, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, config, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.getGames = async (req, res, next) => {
  const userId = req.userData.id;

  try {
    const result = await pool.query("SELECT * FROM games WHERE user_id = $1", [
      userId,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getGameById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { name, config } = req.body;

  try {
    const result = await pool.query(
      "UPDATE games SET name = $1, config = $2 WHERE id = $3 RETURNING *",
      [name, config, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.deleteGame = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM games WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.botMove = async (req, res, next) => {
  const { gameState } = req.body;

  try {
    // Send game state to algorithms backend
    // todo: adjust the algo/ endpoint
    const response = await fetch("http://algorithms-backend/api/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });

    const result = await response.json();

    // Return bot's move to frontend
    res.status(200).json({ botMove: result.botMove });
  } catch (error) {
    next(error);
  }
};
