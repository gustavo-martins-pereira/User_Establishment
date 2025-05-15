import { body, param } from "express-validator";

const postCreateEstablishmentRuleValidator = [
    body("establishmentId")
        .exists().withMessage("The establishmentId is required")
        .isString().withMessage("The establishmentId must be a string")
        .trim().notEmpty().withMessage("The establishmentId cannot be empty")
        .isUUID().withMessage("The establishmentId must be a valid UUID")
        .escape(),
    body("picturesLimit")
        .exists().withMessage("The picturesLimit is required")
        .isInt({ min: 0 }).withMessage("The picturesLimit must be a non-negative integer"),
    body("videoLimit")
        .exists().withMessage("The videoLimit is required")
        .isInt({ min: 0 }).withMessage("The videoLimit must be a non-negative integer")
];

const getEstablishmentRuleByEstablishmentIdValidator = [
    param("establishmentId")
        .exists().withMessage("The establishment rule ID is required")
        .isString().withMessage("The establishment rule ID must be a string")
        .trim().notEmpty().withMessage("The establishment rule ID cannot be empty")
        .isUUID().withMessage("The establishment rule ID must be a valid UUID")
];

const putUpdateEstablishmentRuleValidator = [
    param("id")
        .exists().withMessage("The establishment rule ID is required")
        .isString().withMessage("The establishment rule ID must be a string")
        .trim().notEmpty().withMessage("The establishment rule ID cannot be empty")
        .isUUID().withMessage("The establishment rule ID must be a valid UUID"),
    body("establishmentId")
        .optional()
        .isString().withMessage("The establishmentId must be a string")
        .trim().notEmpty().withMessage("The establishmentId cannot be empty")
        .isUUID().withMessage("The establishmentId must be a valid UUID")
        .escape(),
    body("picturesLimit")
        .optional()
        .isInt({ min: 0 }).withMessage("The picturesLimit must be a non-negative integer"),
    body("videoLimit")
        .optional()
        .isInt({ min: 0 }).withMessage("The videoLimit must be a non-negative integer")
];

const deleteEstablishmentRuleByIdValidator = [
    param("id")
        .exists().withMessage("The establishment rule ID is required")
        .isString().withMessage("The establishment rule ID must be a string")
        .trim().notEmpty().withMessage("The establishment rule ID cannot be empty")
        .isUUID().withMessage("The establishment rule ID must be a valid UUID")
];

export {
    postCreateEstablishmentRuleValidator,
    getEstablishmentRuleByEstablishmentIdValidator,
    putUpdateEstablishmentRuleValidator,
    deleteEstablishmentRuleByIdValidator,
};