import { body } from "express-validator";

import { USER_TYPE } from "@models/user/user.ts";

const postCreateUserValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("email")
        .exists().withMessage("The email is required")
        .isString().withMessage("The email must be a string")
        .trim().notEmpty().withMessage("The email cannot be empty")
        .isEmail().withMessage("The email must be valid")
        .escape(),
    body("type")
        .exists().withMessage("The user type is required")
        .isString().withMessage("The user type must be a string")
        .trim().notEmpty().withMessage("The user type cannot be empty")
        .toUpperCase()
        .isIn(Object.values(USER_TYPE)).withMessage(`The user type must be one of: [${Object.values(USER_TYPE).join(", ")}]`)
];

export {
    postCreateUserValidator,
};
