import { UUID } from "node:crypto";

import { createDynamoDBEstablishment, deleteDynamoDBEstablishmentById, getDynamoDBAllEstablishments, getDynamoDBEstablishmentById, getDynamoDBEstablishmentsByType, updateDynamoDBEstablishmentById } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { CreateEstablishmentResponseDTO, GetAllEstablishmentsResponseDTO, GetEstablishmentByIdResponseDTO, UpdateEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { ESTABLISHMENT_TYPE } from "@models/establishment/establishment.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO | null> {
    return await createDynamoDBEstablishment(establishmentData);
}

async function getEstablishmentById(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentById(id);
}

async function getEstablishmentsByType(type: ESTABLISHMENT_TYPE) {
    return await getDynamoDBEstablishmentsByType(type);
}

async function getAllEstablishments(): Promise<GetAllEstablishmentsResponseDTO> {
    return await getDynamoDBAllEstablishments();
}

async function updateEstablishmentById(id: UUID, establishmentData: UpdateEstablishmentByIdRequestDTO): Promise<UpdateEstablishmentByIdResponseDTO> {
    return await updateDynamoDBEstablishmentById(id, establishmentData);
}

async function deleteEstablishmentById(id: UUID): Promise<void> {
    await deleteDynamoDBEstablishmentById(id);
}

export {
    createEstablishment,
    getEstablishmentById,
    getEstablishmentsByType,
    getAllEstablishments,
    updateEstablishmentById,
    deleteEstablishmentById,
};
