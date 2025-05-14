import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UUID } from "node:crypto";

import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { createEstablishmentUsecase } from "@services/establishment/createEstablishmentUsecase.ts";
import { BadRequestError, NotFoundError } from "@utils/errors/AppError.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { getAllEstablishmentsUsecase } from "@services/establishment/getAllEstablishmentsUsecase.ts";
import { updateEstablishmentByIdUsecase } from "@services/establishment/updateEstablishmentByIdUsecase.ts";

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

async function getEstablishmentById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const { id } = request.params;
        const establishment = await getEstablishmentByIdUsecase(id as UUID);

        if (!establishment) throw new NotFoundError("Establishment not found");

        response.status(200).json(establishment);
    } catch (error) {
        next(error);
    }
}

async function getAllEstablishments(request: Request, response: Response, next: NextFunction) {
    try {
        const establishments = await getAllEstablishmentsUsecase();

        response.status(200).json(establishments);
    } catch (error) {
        next(error);
    }
}

async function updateEstablishmentById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const { id } = request.params;
        const establishmentData: UpdateEstablishmentByIdRequestDTO = request.body;

        const isEstablishmentExists = await getEstablishmentByIdUsecase(id as UUID);
        if (!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        const establishment = await updateEstablishmentByIdUsecase(id as UUID, establishmentData);

        response.status(200).json(establishment);
    } catch (error) {
        next(error);
    }
}

export {
    createEstablishment,
    getEstablishmentById,
    getAllEstablishments,
    updateEstablishmentById,
};
