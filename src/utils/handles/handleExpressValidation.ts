import { BadRequestError } from "@utils/errors/AppError.ts";
import { Request } from "express";
import { validationResult } from "express-validator";

function handleExpressValidation(request: Request) {
    const result = validationResult(request);
    if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);
}

export {
    handleExpressValidation,
};
