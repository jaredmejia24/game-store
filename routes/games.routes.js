const express = require("express");

//controllers
const {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  createGameReview,
} = require("../controllers/games.controller");

//midlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const {
  gameExist,
  consoleIdExist,
} = require("../middlewares/games.middlewares");
const {
  createGameValidators,
  updateGameValidators,
  createReviewValidators,
} = require("../middlewares/validators.middlewares");

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post("/", createGameValidators, consoleIdExist, createGame);

gamesRouter.patch("/:id", updateGameValidators, gameExist, updateGame);

gamesRouter.delete("/:id", gameExist, deleteGame);

gamesRouter.post(
  "/reviews/:id",
  createReviewValidators,
  gameExist,
  createGameReview
);

module.exports = { gamesRouter };
