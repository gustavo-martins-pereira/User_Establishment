import { body, param } from "express-validator";

import { ESTABLISHMENT_TYPE } from "@models/establishment/establishment.ts";

const postCreateEstablishmentValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("ownerId")
        .exists().withMessage("The ownerId is required")
        .isString().withMessage("The ownerId must be a string")
        .trim().notEmpty().withMessage("The ownerId cannot be empty")
        .isUUID().withMessage("The ownerId must be a valid UUID")
        .escape(),
    body("type")
        .exists().withMessage("The establishment type is required")
        .isString().withMessage("The establishment type must be a string")
        .trim().notEmpty().withMessage("The establishment type cannot be empty")
        .toUpperCase()
        .isIn(Object.values(ESTABLISHMENT_TYPE)).withMessage(`The establishment type must be one of: [${Object.values(ESTABLISHMENT_TYPE).join(", ")}]`)
];

const getEstablishmentByIdValidator = [
    param("id")
        .exists().withMessage("The establishment ID is required")
        .isString().withMessage("The establishment ID must be a string")
        .trim().notEmpty().withMessage("The establishment ID cannot be empty")
        .isUUID().withMessage("The establishment ID must be a valid UUID")
];

const getEstablishmentsByTypeValidator = [
    param("type")
        .isString().withMessage("The establishment type must be a string")
        .trim().notEmpty().withMessage("The establishment type cannot be empty")
        .toUpperCase()
        .isIn(Object.values(ESTABLISHMENT_TYPE)).withMessage(`The establishment type must be one of: [${Object.values(ESTABLISHMENT_TYPE).join(", ")}]`)
];

const putUpdateEstablishmentValidator = [
    param("id")
        .exists().withMessage("The establishment ID is required")
        .isString().withMessage("The establishment ID must be a string")
        .trim().notEmpty().withMessage("The establishment ID cannot be empty")
        .isUUID().withMessage("The establishment ID must be a valid UUID"),
    body("name")
        .optional()
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("ownerId")
        .optional()
        .isString().withMessage("The owner id must be a string")
        .trim().notEmpty().withMessage("The owner id cannot be empty")
        .isUUID().withMessage("The owner id must be a valid UUID")
        .escape(),
    body("type")
        .optional()
        .isString().withMessage("The establishment type must be a string")
        .trim().notEmpty().withMessage("The establishment type cannot be empty")
        .toUpperCase()
        .isIn(Object.values(ESTABLISHMENT_TYPE)).withMessage(`The establishment type must be one of: [${Object.values(ESTABLISHMENT_TYPE).join(", ")}]`)
];

const deleteEstablishmentByIdValidator = [
    param("id")
        .exists().withMessage("The establishment ID is required")
        .isString().withMessage("The establishment ID must be a string")
        .trim().notEmpty().withMessage("The establishment ID cannot be empty")
        .isUUID().withMessage("The establishment ID must be a valid UUID")
];

export {
    postCreateEstablishmentValidator,
    getEstablishmentByIdValidator,
    getEstablishmentsByTypeValidator,
    putUpdateEstablishmentValidator,
    deleteEstablishmentByIdValidator,
};
