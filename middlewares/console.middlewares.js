//models
const { Console } = require("../models/console.model");

//utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const consoleExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Console.findOne({ where: { id, status: "active" } });

  if (!console) {
    return next(new AppError("console doesnt exist", 404));
  }

  req.console = console;
  next();
});

module.exports = { consoleExist };
