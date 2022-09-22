//models
const { Game } = require("../models/game.model");
const { Console } = require("../models/console.model");
const { Review } = require("../models/review.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGame = await Game.create({ title, genre });

  res.status(201).json({
    status: "success",
    data: {
      newGame,
    },
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: "active" },
    include: [{ model: Console }, { model: Review }],
  });

  res.status(200).json({
    status: "success",
    data: {
      games,
    },
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { game } = req;

  const updatedGame = await game.update({ title });

  res.status(200).json({
    status: "success",
    data: {
      updatedGame,
    },
  });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

const createGameReview = catchAsync(async (req, res, next) => {
  const { game, sessionUser } = req;
  const { comment } = req.body;

  const newReview = await Review.create({
    gameId: game.id,
    userId: sessionUser.id,
    comment,
  });

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});

module.exports = {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  createGameReview,
};
