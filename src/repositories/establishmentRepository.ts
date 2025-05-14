import { UUID } from "node:crypto";

import { createDynamoDBEstablishment, getDynamoDBAllEstablishments, getDynamoDBEstablishmentById, updateDynamoDBEstablishmentById } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { GetAllEstablishmentsResponseDTO, GetEstablishmentByIdResponseDTO, UpdateEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO) {
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

export {
    createEstablishment,
    getEstablishmentById,
    getAllEstablishments,
    updateEstablishmentById,
};
