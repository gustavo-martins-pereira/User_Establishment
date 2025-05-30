import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, UpdateCommand, UpdateCommandInput, DeleteCommand, DeleteCommandInput, ScanCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetAllUsersResponseDTO, GetUserByIdResponseDTO, UpdateUserByIdResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { InternalServerError, NotFoundError } from "@utils/errors/AppError.ts";

const TABLE_NAME = "users";

async function createDynamoDBUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const params: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: {
            id,
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

        const user = await getDynamoDBUserById(id);
        return user;
    } catch (error) {
        throw new InternalServerError("Failed to create user in DynamoDB");
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
        throw new InternalServerError("Failed to fetch user from DynamoDB");
    }
}

async function getDynamoDBAllUsers(): Promise<GetAllUsersResponseDTO> {
    const params: ScanCommandInput = {
        TableName: TABLE_NAME,
    };

    try {
        const command = new ScanCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Items) {
            return [];
        }

        return response.Items as GetUserByIdResponseDTO[];
    } catch (error) {
        throw new InternalServerError("Failed to fetch all users from DynamoDB");
    }
}

async function updateDynamoDBUserById(id: UUID, updateUserData: UpdateUserRequestDTO): Promise<UpdateUserByIdResponseDTO> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updateUserData).forEach(([key, value]) => {
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

        if (!response.Attributes) throw new NotFoundError("User not found");

        return response.Attributes as UpdateUserByIdResponseDTO;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }

        throw new InternalServerError("Failed to update user in DynamoDB");
    }
}

async function deleteDynamoDBUserById(id: UUID): Promise<void> {
    const params: DeleteCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    };

    try {
        const command = new DeleteCommand(params);
        await dynamoDBClient.send(command);
    } catch (error) {
        throw new InternalServerError("Failed to delete user from DynamoDB");
    }
}

export {
    createDynamoDBUser,
    getDynamoDBUserById,
    getDynamoDBAllUsers,
    updateDynamoDBUserById,
    deleteDynamoDBUserById,
};
