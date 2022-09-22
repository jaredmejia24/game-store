//models
const { Console } = require("../models/console.model");
const { Game } = require("../models/game.model");

//utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const gameExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const game = await Game.findOne({ where: { id, status: "active" } });

  if (!game) {
    return next(new AppError("game doesnt exist", 404));
  }

  req.game = game;
  next();
});

const consoleIdExist = catchAsync(async (req, res, next) => {
  const { consoleId } = req.body;

  const console = await Console.findOne({where: {id: consoleId, status: "active"} });

  if (!console) {
    return next(new AppError("console doesnt exist", 404));
  }

  next();
});

module.exports = { gameExist, consoleIdExist };
