//models
const { Console } = require("../models/console.model");
const { Game } = require("../models/game.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({ name, company });

  res.status(201).json({
    status: "success",
    data: {
      newConsole,
    },
  });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    where: { status: "active" },
    include: {
      model: Game,
      through: { attributes: [] },
      where: { status: "active" },
      required: false,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      consoles,
    },
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;

  const updatedConsole = await console.update({ name });

  res.status(200).json({
    status: "success",
    data: {
      updatedConsole,
    },
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createConsole,
  getAllConsoles,
  updateConsole,
  deleteConsole,
};
