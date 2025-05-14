import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { InternalServerError } from "@utils/errors/AppError.ts";
import { CreateEstablishmentResponseDTO, GetAllEstablishmentsResponseDTO, GetEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";

const TABLE_NAME = "establishments";

async function createDynamoDBEstablishment(establishmentData: CreateEstablishmentRequestDTO): Promise<CreateEstablishmentResponseDTO | null> {
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

        const establishment = await getDynamoDBEstablishmentById(id);
        return establishment;
    } catch (error) {
        throw new InternalServerError("Failed to create establishment in DynamoDB");
    }
}

async function getDynamoDBEstablishmentById(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    const params: GetCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    try {
        const command = new GetCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Item) {
            return null;
        }

        return response.Item as GetEstablishmentByIdResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch establishment from DynamoDB");
    }
}

async function getDynamoDBAllEstablishments(): Promise<GetAllEstablishmentsResponseDTO> {
    const params: ScanCommandInput = {
        TableName: TABLE_NAME,
    };

    try {
        const command = new ScanCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Items) {
            return [];
        }

        return response.Items as GetAllEstablishmentsResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch all users from DynamoDB");
    }
}

export {
    createDynamoDBEstablishment,
    getDynamoDBEstablishmentById,
    getDynamoDBAllEstablishments,
};
