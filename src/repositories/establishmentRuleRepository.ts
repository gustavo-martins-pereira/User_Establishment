import { UUID } from "node:crypto";

import { createDynamoDBEstablishmentRule, deleteDynamoDBEstablishmentRuleById, getDynamoDBEstablishmentRuleByEstablishmentId, getDynamoDBEstablishmentRuleById, updateDynamoDBEstablishmentRuleById } from "@aws/dynamoDB/services/establishmentRulesDynamoDBService.ts";
import { CreateEstablishmentRuleRequestDTO, UpdateEstablishmentRuleByIdRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { CreateEstablishmentRuleResponseDTO, GetEstablishmentRuleByIdResponseDTO, UpdateEstablishmentRuleByIdResponseDTO } from "@models/establishmentRule/response/establishmentResponseDTO.ts";

async function createEstablishmentRule(establishmentRuleData: CreateEstablishmentRuleRequestDTO): Promise<CreateEstablishmentRuleResponseDTO | null> {
    return await createDynamoDBEstablishmentRule(establishmentRuleData);
}

async function getEstablishmentRuleById(id: UUID): Promise<GetEstablishmentRuleByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentRuleById(id);
}

async function getEstablishmentRuleByEstablishmentId(establishmentId: UUID): Promise<GetEstablishmentRuleByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentRuleByEstablishmentId(establishmentId);
}

async function updateEstablishmentRuleById(id: UUID, establishmentRuleData: UpdateEstablishmentRuleByIdRequestDTO): Promise<UpdateEstablishmentRuleByIdResponseDTO> {
    return await updateDynamoDBEstablishmentRuleById(id, establishmentRuleData);
}

async function deleteEstablishmentRuleById(id: UUID): Promise<void> {
    await deleteDynamoDBEstablishmentRuleById(id);
}

export {
    createEstablishmentRule,
    getEstablishmentRuleById,
    getEstablishmentRuleByEstablishmentId,
    updateEstablishmentRuleById,
    deleteEstablishmentRuleById,
};
