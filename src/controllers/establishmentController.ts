import { Request, Response, NextFunction } from "express";
import { UUID } from "node:crypto";

import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { createEstablishmentUsecase } from "@services/establishment/createEstablishmentUsecase.ts";
import { NotFoundError } from "@utils/errors/AppError.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { getAllEstablishmentsUsecase } from "@services/establishment/getAllEstablishmentsUsecase.ts";
import { updateEstablishmentByIdUsecase } from "@services/establishment/updateEstablishmentByIdUsecase.ts";
import { deleteEstablishmentByIdUsecase } from "@services/establishment/deleteEstablishmentByIdUsecase.ts";
import { getUserByIdUsecase } from "@services/user/getUserByIdUsecase.ts";
import { getEstablishmentsByTypeUsecase } from "@services/establishment/getEstablishmentsByTypeUsecase.ts";
import { ESTABLISHMENT_TYPE } from "@models/establishment/establishment.ts";
import { handleExpressValidation } from "@utils/handles/handleExpressValidation.ts";
import { removeUndefinedProperties } from "@utils/object.ts";

async function createEstablishment(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const {
            name,
            ownerId,
            type,
        }: CreateEstablishmentRequestDTO = request.body;

        const isOwnerExists = await getUserByIdUsecase(ownerId);
        if(!isOwnerExists) throw new NotFoundError("Owner not found");

        const establishment = await createEstablishmentUsecase({ name, ownerId, type } as CreateEstablishmentRequestDTO);

        response.status(201).json(establishment);
    } catch (error) {
        next(error);
    }
}

async function getEstablishmentById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;

        const establishment = await getEstablishmentByIdUsecase(id as UUID);
        if(!establishment) throw new NotFoundError("Establishment not found");

        response.status(200).json(establishment);
    } catch (error) {
        next(error);
    }
}

async function getEstablishmentsByType(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { type } = request.params;
        const establishments = await getEstablishmentsByTypeUsecase(type as ESTABLISHMENT_TYPE);

        response.status(200).json(establishments);
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
        handleExpressValidation(request);

        const { id } = request.params;
        const {
            name,
            ownerId,
            type,
        }: UpdateEstablishmentByIdRequestDTO = request.body;

        const isEstablishmentExists = await getEstablishmentByIdUsecase(id as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        if(ownerId) {
            const isOwnerExists = await getUserByIdUsecase(ownerId as UUID);
            if(!isOwnerExists) throw new NotFoundError("Owner id not found");
        }

        const establishment = await updateEstablishmentByIdUsecase(
            id as UUID,
            removeUndefinedProperties({ name, ownerId, type } as UpdateEstablishmentByIdRequestDTO)
        );

        response.status(200).json(establishment);
    } catch (error) {
        next(error);
    }
}

async function deleteEstablishmentById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const isEstablishmentExists = await getEstablishmentByIdUsecase(id as UUID);
        
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        await deleteEstablishmentByIdUsecase(id as UUID);

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export {
    createEstablishment,
    getEstablishmentById,
    getEstablishmentsByType,
    getAllEstablishments,
    updateEstablishmentById,
    deleteEstablishmentById,
};
