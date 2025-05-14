import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { InternalServerError } from "@utils/errors/AppError.ts";
import { CreateEstablishmentResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";

const TABLE_NAME = "establishments";

async function createDynamoDBEstablishment(establishmentData: CreateEstablishmentRequestDTO) { //Promise<CreateEstablishmentResponseDTO | null> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const params: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: {
            id,
            name: establishmentData.name,
            ownerId: establishmentData.ownerId,
            type: establishmentData.type,
            createdAt: now,
            updatedAt: now,
        }
    };

    try {
        const command = new PutCommand(params);
        await dynamoDBClient.send(command);
    } catch (error) {
        throw new InternalServerError("Failed to create establishment in DynamoDB");
    }
}

export {
    createDynamoDBEstablishment,
};
