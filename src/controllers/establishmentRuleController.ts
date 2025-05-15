import { Request, Response, NextFunction } from "express";
import { UUID } from "node:crypto";

import { CreateEstablishmentRuleRequestDTO, UpdateEstablishmentRuleByIdRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { createEstablishmentRuleUsecase } from "@services/establishmentRule/createEstablishmentRuleUsecase.ts";
import { NotFoundError } from "@utils/errors/AppError.ts";
import { getEstablishmentRuleByIdUsecase } from "@services/establishmentRule/getEstablishmentRuleByIdUsecase.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { updateEstablishmentRuleByIdUsecase } from "@services/establishmentRule/updateEstablishmentRuleByIdUsecase.ts";
import { deleteEstablishmentRuleByIdUsecase } from "@services/establishmentRule/deleteEstablishmentRuleByIdUsecase.ts";
import { getEstablishmentRuleByEstablishmentIdUsecase } from "@services/establishmentRule/getEstablishmentRuleByEstablishmentIdUsecase.ts";
import { handleExpressValidation } from "@utils/handles/handleExpressValidation.ts";

async function createEstablishmentRule(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const establishmentRuleData: CreateEstablishmentRuleRequestDTO = request.body;

        const isEstablishmentExists = await getEstablishmentByIdUsecase(establishmentRuleData.establishmentId as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment id not found");

        const establishmentRule = await createEstablishmentRuleUsecase(establishmentRuleData);

        response.status(201).json(establishmentRule);
    } catch (error) {
        next(error);
    }
}

async function getEstablishmentRuleByEstablishmentId(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { establishmentId } = request.params;
        const isEstablishmentExists = await getEstablishmentByIdUsecase(establishmentId as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        const establishmentRule = await getEstablishmentRuleByEstablishmentIdUsecase(establishmentId as UUID);
        if(!establishmentRule) throw new NotFoundError("Establishment rule not found in this establishment");

        response.status(200).json(establishmentRule);
    } catch (error) {
        next(error);
    }
}

async function updateEstablishmentRuleById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const establishmentRuleData: UpdateEstablishmentRuleByIdRequestDTO = request.body;

        // TODO: If the id is not present?
        const isEstablishmentExists = await getEstablishmentByIdUsecase(establishmentRuleData.establishmentId as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        const establishment = await updateEstablishmentRuleByIdUsecase(id as UUID, establishmentRuleData);

        response.status(200).json(establishment);
    } catch (error) {
        next(error);
    }
}

async function deleteEstablishmentRuleById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const isEstablishmentRuleExists = await getEstablishmentRuleByIdUsecase(id as UUID);
        
        if(!isEstablishmentRuleExists) throw new NotFoundError("Establishment rule not found");

        await deleteEstablishmentRuleByIdUsecase(id as UUID);

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export {
    createEstablishmentRule,
    getEstablishmentRuleByEstablishmentId,
    updateEstablishmentRuleById,
    deleteEstablishmentRuleById,
};
