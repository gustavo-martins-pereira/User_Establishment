import { DeleteCommand, DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, QueryCommand, QueryCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { dynamoDBClient } from "@aws/dynamoDB/awsClient.ts";
import { CreateEstablishmentRuleRequestDTO, UpdateEstablishmentRuleByIdRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { CreateEstablishmentRuleResponseDTO, GetEstablishmentRuleByEstablishmentIdResponseDTO, GetEstablishmentRuleByIdResponseDTO, UpdateEstablishmentRuleByIdResponseDTO } from "@models/establishmentRule/response/establishmentResponseDTO.ts";
import { InternalServerError, NotFoundError } from "@utils/errors/AppError.ts";

const TABLE_NAME = "establishment_rules";

async function createDynamoDBEstablishmentRule(establishmentRuleData: CreateEstablishmentRuleRequestDTO): Promise<CreateEstablishmentRuleResponseDTO | null> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const params: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: {
            id,
            establishmentId: establishmentRuleData.establishmentId,
            picturesLimit: establishmentRuleData.picturesLimit,
            videoLimit: establishmentRuleData.videoLimit,
            createdAt: now,
            updatedAt: now,
        }
    };

    try {
        const command = new PutCommand(params);
        await dynamoDBClient.send(command);

        const establishmentRule = await getDynamoDBEstablishmentRuleById(id);
        return establishmentRule;
    } catch (error) {
        throw new InternalServerError("Failed to create establishment rule in DynamoDB");
    }
}

async function getDynamoDBEstablishmentRuleById(id: UUID): Promise<GetEstablishmentRuleByIdResponseDTO | null> {
    const params: GetCommandInput = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };

    try {
        const command = new GetCommand(params);
        const response = await dynamoDBClient.send(command);

        if(!response.Item) {
            return null;
        }

        return response.Item as GetEstablishmentRuleByIdResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch establishment rule from DynamoDB");
    }
}

async function getDynamoDBEstablishmentRuleByEstablishmentId(establishmentId: UUID): Promise<GetEstablishmentRuleByEstablishmentIdResponseDTO | null> {
    const params: QueryCommandInput = {
        TableName: TABLE_NAME,
        IndexName: "EstablishmentIdIndex",
        KeyConditionExpression: "establishmentId = :establishmentId",
        ExpressionAttributeValues: {
            ":establishmentId": establishmentId,
        },
    };

    try {
        const command = new QueryCommand(params);
        const response = await dynamoDBClient.send(command);

        if(!response.Items || response.Items.length === 0) {
            return null;
        }

        return response.Items[0] as GetEstablishmentRuleByEstablishmentIdResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch establishment rule from DynamoDB");
    }
}

async function updateDynamoDBEstablishmentRuleById(id: UUID, updateEstablishmentRuleData: UpdateEstablishmentRuleByIdRequestDTO): Promise<UpdateEstablishmentRuleByIdResponseDTO> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updateEstablishmentRuleData).forEach(([key, value]) => {
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

        if(!response.Attributes) throw new NotFoundError("Establishment rule not found");

        return response.Attributes as UpdateEstablishmentRuleByIdResponseDTO;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }

        throw new InternalServerError("Failed to update Establishment rule in DynamoDB");
    }
}

async function deleteDynamoDBEstablishmentRuleById(id: UUID): Promise<void> {
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
        throw new InternalServerError("Failed to delete establishment rule from DynamoDB");
    }
}

export {
    createDynamoDBEstablishmentRule,
    getDynamoDBEstablishmentRuleById,
    getDynamoDBEstablishmentRuleByEstablishmentId,
    updateDynamoDBEstablishmentRuleById,
    deleteDynamoDBEstablishmentRuleById,
};
