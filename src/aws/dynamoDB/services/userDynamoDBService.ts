import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateUserDTO } from "@models/user.ts";

async function createDynamoDBUser({ name, email, type }: CreateUserDTO) {
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
        console.log("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export {
    createDynamoDBUser,
};
