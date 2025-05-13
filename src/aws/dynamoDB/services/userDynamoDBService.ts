import { PutItemCommand, PutItemCommandInput, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { USER_TYPE } from "@models/user/user.ts";

async function createDynamoDBUser({ name, email, type }: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const params: PutItemCommandInput = {
        TableName: "users",
        Item: {
            id: { S: randomUUID() },
            name: { S: name },
            email: { S: email },
            type: { S: type },
            createdAt: { S: new Date().toISOString() }
        }
    };

    try {
        const command = new PutItemCommand(params);
        await dynamoDBClient.send(command);

        return { name, email, type };
    } catch (error) {
        throw error;
    }
}

async function getDynamoDBUserById(id: UUID): Promise<CreateUserResponseDTO | null> {
    const params: GetItemCommandInput = {
        TableName: "users",
        Key: {
            id: { S: id }
        }
    };

    try {
        const command = new GetItemCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Item) {
            return null;
        }

        return {
            name: response.Item.name.S!,
            email: response.Item.email.S!,
            type: response.Item.type.S! as USER_TYPE,
        };
    } catch (error) {
        throw error;
    }
}

export {
    createDynamoDBUser,
    getDynamoDBUserById,
};
