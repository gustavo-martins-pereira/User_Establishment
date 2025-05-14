import { body } from "express-validator";

import { ESTABLISHMENT_TYPE } from "@models/establishment/establishment.ts";

const postCreateEstablishmentValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("ownerId")
        .exists().withMessage("The email is required")
        .isString().withMessage("The email must be a string")
        .trim().notEmpty().withMessage("The email cannot be empty")
        .isUUID().withMessage("The owner must be a valid UUID")
        .escape(),
    body("type")
        .exists().withMessage("The establishment type is required")
        .isString().withMessage("The establishment type must be a string")
        .trim().notEmpty().withMessage("The establishment type cannot be empty")
        .toUpperCase()
        .isIn(Object.values(ESTABLISHMENT_TYPE)).withMessage(`The establishment type must be one of: [${Object.values(ESTABLISHMENT_TYPE).join(", ")}]`)
];

export {
    postCreateEstablishmentValidator,
};
