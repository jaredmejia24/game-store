const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createGameValidators = [
  body("title")
    .notEmpty()
    .withMessage("title must not be empty")
    .isString()
    .withMessage("title must be a string"),
  body("genre")
    .notEmpty()
    .withMessage("genre must not be empty")
    .isString()
    .withMessage("title must be a string"),
  body("consoleId")
    .notEmpty()
    .withMessage("consoleId must not be empty")
    .isNumeric()
    .withMessage("consoleId must be a number"),
  checkValidations,
];

const updateGameValidators = [
  body("title")
    .notEmpty()
    .withMessage("title must not be empty")
    .isString()
    .withMessage("title must be a string"),
  checkValidations,
];

const createReviewValidators = [
  body("comment")
    .notEmpty()
    .withMessage("comment must not be empty")
    .isString()
    .withMessage("comment must be an string"),
  checkValidations,
];

const createConsoleValidators = [
  body("name")
    .notEmpty()
    .withMessage("name must not be empty")
    .isString()
    .withMessage("name must be a string"),
  body("company")
    .notEmpty()
    .withMessage("company must not be empty")
    .isString()
    .withMessage("company must be a string"),
  checkValidations,
];

const updateConsoleValidators = [
  body("name")
    .notEmpty()
    .withMessage("name must not be empty")
    .isString()
    .withMessage("name must be a string"),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createGameValidators,
  updateGameValidators,
  createReviewValidators,
  createConsoleValidators,
  updateConsoleValidators,
};
