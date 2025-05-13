import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";

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

export {
    createDynamoDBUser,
};
