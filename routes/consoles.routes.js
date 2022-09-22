const express = require("express");

//controller
const {
  createConsole,
  getAllConsoles,
  updateConsole,
  deleteConsole,
} = require("../controllers/consoles.controller");

//middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const { consoleExist } = require("../middlewares/console.middlewares");
const {
  createConsoleValidators,
  updateConsoleValidators,
} = require("../middlewares/validators.middlewares");

const consolesRouter = express.Router();

consolesRouter.get("/", getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post("/", createConsoleValidators, createConsole);

consolesRouter.patch(
  "/:id",
  updateConsoleValidators,
  consoleExist,
  updateConsole
);

consolesRouter.delete("/:id", consoleExist, deleteConsole);

module.exports = { consolesRouter };
