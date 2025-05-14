import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { InternalServerError, NotFoundError } from "@utils/errors/AppError.ts";
import { CreateEstablishmentResponseDTO, GetAllEstablishmentsResponseDTO, GetEstablishmentByIdResponseDTO, UpdateEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";

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

async function updateDynamoDBEstablishmentById(id: UUID, updateEstablishmentData: UpdateEstablishmentByIdRequestDTO): Promise<UpdateEstablishmentByIdResponseDTO> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updateEstablishmentData).forEach(([key, value]) => {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
    });

    updateExpressions.push("#updatedAt = :updatedAt");
    expressionAttributeNames["#updatedAt"] = "updatedAt";
    expressionAttributeValues[":updatedAt"] = new Date().toISOString();

    const params: UpdateCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id
        },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };

    try {
        const command = new UpdateCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Attributes) throw new NotFoundError("Establishment not found");

        return response.Attributes as UpdateEstablishmentByIdResponseDTO;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }

        throw new InternalServerError("Failed to update Establishment in DynamoDB");
    }
}

export {
    createDynamoDBEstablishment,
    getDynamoDBEstablishmentById,
    getDynamoDBAllEstablishments,
    updateDynamoDBEstablishmentById,
};
