import express from "express";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

import "./configs/env.ts";

// DYNAMODB
const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_DYNAMODB_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY || "",
    }
});

const command = new ListTablesCommand({});
const response = await dynamoDBClient.send(command);

console.log(response.TableNames?.join("\n"));

// EXPRESS
const app = express();

app.listen(3000, () => {
    console.log("App listening on port " + 3000);
});
