import { body, param } from "express-validator";

const postCreateProductValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("price")
        .exists().withMessage("The price is required")
        .isNumeric().withMessage("The price must be a number")
        .isFloat({ min: 0.01 }).withMessage("The price must be greater than 0"),
    body("establishmentId")
        .exists().withMessage("The establishment id is required")
        .isString().withMessage("The establishment id must be a string")
        .trim().notEmpty().withMessage("The establishment id cannot be empty")
        .isUUID().withMessage("The establishment id must be a valid UUID")
        .escape(),
];

const getProductByIdValidator = [
    param("id")
        .exists().withMessage("The product ID is required")
        .isString().withMessage("The product ID must be a string")
        .trim().notEmpty().withMessage("The product ID cannot be empty")
        .isUUID().withMessage("The product ID must be a valid UUID")
];

const putUpdateProductValidator = [
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
    body("price")
        .optional()
        .isNumeric().withMessage("The price must be a number")
        .isFloat({ min: 0.01 }).withMessage("The price must be greater than 0"),
    body("establishmentId")
        .optional()
        .isString().withMessage("The establishment id must be a string")
        .trim().notEmpty().withMessage("The establishment id cannot be empty")
        .isUUID().withMessage("The establishment id must be a valid UUID")
        .escape(),
];

export {
    postCreateProductValidator,
    getProductByIdValidator,
    putUpdateProductValidator
};
