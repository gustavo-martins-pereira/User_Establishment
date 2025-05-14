import { UUID } from "node:crypto";

import { createDynamoDBEstablishment, getDynamoDBAllEstablishments, getDynamoDBEstablishmentById } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { GetEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO) {
    return await createDynamoDBEstablishment(establishmentData);
}

async function getEstablishmentById(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentById(id);
}

async function getAllEstablishments() {
    return await getDynamoDBAllEstablishments();
}

export {
    createEstablishment,
    getEstablishmentById,
    getAllEstablishments,
};
