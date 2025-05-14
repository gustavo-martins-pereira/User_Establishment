import { CreateTableCommand, ScalarAttributeType, KeyType, CreateTableCommandInput, DescribeTableCommand, ResourceNotFoundException, ProjectionType } from "@aws-sdk/client-dynamodb";

import "@configs/env.ts";
import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";

async function createTables() {
    await createUsersTable();
    await createEstablishmentTable();
    await createProductsTable();
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
                },
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

async function createEstablishmentTable() {
    try {
        await dynamoDBClient.send(new DescribeTableCommand({ TableName: "establishments" }));
        console.log("Table 'establishments' already exists");
        return;
    } catch (error) {
        if (error instanceof ResourceNotFoundException) {
            const params: CreateTableCommandInput = {
                TableName: "establishments",
                KeySchema: [
                    { AttributeName: "id", KeyType: KeyType.HASH }
                ],
                AttributeDefinitions: [
                    { AttributeName: "id", AttributeType: ScalarAttributeType.S },
                    { AttributeName: "ownerId", AttributeType: ScalarAttributeType.S }
                ],
                GlobalSecondaryIndexes: [
                    {
                        IndexName: "OwnerIdIndex",
                        KeySchema: [
                            { AttributeName: "ownerId", KeyType: KeyType.HASH }
                        ],
                        Projection: {
                            ProjectionType: ProjectionType.ALL
                        },
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 5,
                            WriteCapacityUnits: 5
                        }
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                },
            };

            try {
                const command = new CreateTableCommand(params);
                const response = await dynamoDBClient.send(command);
                console.log("Establishment table created successfully:", response);
            } catch (createError) {
                console.log("Error creating establishment table:", createError);
            }
        } else {
            console.log("Error checking establishment table existence:", error);
        }
    }
}

async function createProductsTable() {
    try {
        await dynamoDBClient.send(new DescribeTableCommand({ TableName: "products" }));
        console.log("Table 'products' already exists");
        return;
    } catch (error) {
        if (error instanceof ResourceNotFoundException) {
            const params: CreateTableCommandInput = {
                TableName: "products",
                KeySchema: [
                    { AttributeName: "id", KeyType: KeyType.HASH }
                ],
                AttributeDefinitions: [
                    { AttributeName: "id", AttributeType: ScalarAttributeType.S },
                    { AttributeName: "establishmentId", AttributeType: ScalarAttributeType.S }
                ],
                GlobalSecondaryIndexes: [
                    {
                        IndexName: "EstablishmentIdIndex",
                        KeySchema: [
                            { AttributeName: "establishmentId", KeyType: KeyType.HASH }
                        ],
                        Projection: {
                            ProjectionType: ProjectionType.ALL
                        },
                        ProvisionedThroughput: {
                            ReadCapacityUnits: 5,
                            WriteCapacityUnits: 5
                        }
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                },
            };

            try {
                const command = new CreateTableCommand(params);
                const response = await dynamoDBClient.send(command);
                console.log("Products table created successfully:", response);
            } catch (createError) {
                console.log("Error creating products table:", createError);
            }
        } else {
            console.log("Error checking products table existence:", error);
        }
    }
}

export {
    createTables,
};