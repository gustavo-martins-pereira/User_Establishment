import { UUID } from "node:crypto";

import { createDynamoDBEstablishment, deleteDynamoDBEstablishmentById, getDynamoDBAllEstablishments, getDynamoDBEstablishmentById, updateDynamoDBEstablishmentById } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { CreateEstablishmentResponseDTO, GetAllEstablishmentsResponseDTO, GetEstablishmentByIdResponseDTO, UpdateEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO | null> {
    return await createDynamoDBEstablishment(establishmentData);
}

async function getEstablishmentById(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentById(id);
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
    getAllEstablishments,
    updateEstablishmentById,
    deleteEstablishmentById,
};
