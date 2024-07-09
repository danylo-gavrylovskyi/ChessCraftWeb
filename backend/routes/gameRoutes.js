const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const auth = require("../middleware/auth");

router.post("/", auth, gameController.createGame);
router.get("/", auth, gameController.getGames);
router.get("/:id", auth, gameController.getGameById);
router.put("/:id", auth, gameController.updateGame);
router.delete("/:id", auth, gameController.deleteGame);
// Route to handle the game state and return the bot's move
router.post("/bot-move", gameController.botMove);

module.exports = router;
