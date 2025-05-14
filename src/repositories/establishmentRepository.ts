import { createDynamoDBEstablishment } from "@aws/dynamoDB/services/establishmentDynamoDBService.ts";
import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";

async function createEstablishment(establishmentData: CreateEstablishmentRequestDTO) {
    return await createDynamoDBEstablishment(establishmentData);
}

export {
    createEstablishment,
};
