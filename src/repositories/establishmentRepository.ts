import { UUID } from "node:crypto";

import { createDynamoDBEstablishment, getDynamoDBEstablishmentById } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { GetEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO) {
    return await createDynamoDBEstablishment(establishmentData);
}

async function getEstablishmentById(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    return await getDynamoDBEstablishmentById(id);
}

export {
    createEstablishment,
    getEstablishmentById,
};
