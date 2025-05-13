import { CreateTableCommand, ScalarAttributeType, KeyType, CreateTableCommandInput, DescribeTableCommand, ResourceNotFoundException } from "@aws-sdk/client-dynamodb";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";

function createTables() {
    createUsersTable();
}

async function createUsersTable() {
    try {
        await dynamoDBClient.send(new DescribeTableCommand({ TableName: "users" }));
        console.log("Table 'users' already exists");
        return;
    } catch (error) {
        if (error instanceof ResourceNotFoundException) {
            const params: CreateTableCommandInput = {
                TableName: "users",
                KeySchema: [
                    { AttributeName: "id", KeyType: KeyType.HASH }
                ],
                AttributeDefinitions: [
                    { AttributeName: "id", AttributeType: ScalarAttributeType.S }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            };

            try {
                const command = new CreateTableCommand(params);
                const response = await dynamoDBClient.send(command);
                console.log("Table created successfully:", response);
            } catch (createError) {
                console.log("Error creating table:", createError);
            }
        } else {
            console.log("Error checking table existence:", error);
        }
    }
}

export {
    createTables,
};