import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_DYNAMODB_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY || "",
    }
});

export {
    dynamoDBClient,
};
