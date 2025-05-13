import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetUserByIdResponseDTO, UpdateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";

const TABLE_NAME = "users";

async function createDynamoDBUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const now = new Date().toISOString();
    const params: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: {
            id: randomUUID(),
            name: userData.name,
            email: userData.email,
            type: userData.type,
            createdAt: now,
            updatedAt: now,
        }
    };

    try {
        const command = new PutCommand(params);
        await dynamoDBClient.send(command);

        return userData;
    } catch (error) {
        throw error;
    }
}

async function getDynamoDBUserById(id: UUID): Promise<GetUserByIdResponseDTO | null> {
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

        return response.Item as GetUserByIdResponseDTO;
    } catch (error) {
        throw error;
    }
}

async function updateDynamoDBUser(id: UUID, updateUserData: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO | null> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updateUserData).forEach(([key, value]) => {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = { S: value };
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

        if (!response.Attributes) {
            return null;
        }

        return {
            id: response.Attributes.id,
            name: response.Attributes.name.S,
            email: response.Attributes.email.S,
            type: response.Attributes.type,
            createdAt: response.Attributes.createdAt,
            updatedAt: response.Attributes.updatedAt,
        };
    } catch (error) {
        throw error;
    }
}

export {
    createDynamoDBUser,
    getDynamoDBUserById,
    updateDynamoDBUser,
};
