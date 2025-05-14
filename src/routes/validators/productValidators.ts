import { body } from "express-validator";

const postCreateProductValidator = [
    body("name")
        .exists().withMessage("The name is required")
        .isString().withMessage("The name must be a string")
        .trim().notEmpty().withMessage("The name cannot be empty")
        .escape(),
    body("price")
        .exists().withMessage("The price is required")
        .isNumeric().withMessage("The price must be a number"),
    body("establishmentId")
        .exists().withMessage("The establishment id is required")
        .isString().withMessage("The establishment id must be a string")
        .trim().notEmpty().withMessage("The establishment id cannot be empty")
        .isUUID().withMessage("The establishment id must be a valid UUID")
        .escape(),
];

export {
    postCreateProductValidator,
};
