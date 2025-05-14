import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { createEstablishmentUsecase } from "@services/establishment/createEstablishmentUsecase.ts";
import { BadRequestError } from "@utils/errors/AppError.ts";

async function createEstablishment(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const establishmentData: CreateEstablishmentRequestDTO = request.body;
        const establishment = await createEstablishmentUsecase(establishmentData);

        response.status(201).json(establishment);
    } catch (error) {
        next(error);
    }
}

export {
    createEstablishment,
};
