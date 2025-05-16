import { DeleteCommand, DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { CreateProductRequestDTO, UpdateProductByIdRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { CreateProductResponseDTO, GetAllProductsResponseDTO, GetProductByIdResponseDTO, UpdateProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";
import { dynamoDBClient } from "../awsClient.ts";
import { InternalServerError, NotFoundError } from "@utils/errors/AppError.ts";
import { Product } from "@models/product/product.ts";

const TABLE_NAME = "products";

async function createDynamoDBProduct(productData: CreateProductRequestDTO): Promise<CreateProductResponseDTO | null> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const params: PutCommandInput = {
        TableName: TABLE_NAME,
        Item: {
            id,
            name: productData.name,
            price: productData.price,
            establishmentId: productData.establishmentId,
            createdAt: now,
            updatedAt: now,
        }
    };

    try {
        const command = new PutCommand(params);
        await dynamoDBClient.send(command);

        const product = await getDynamoDBProductById(id);
        return product;
    } catch (error) {
        throw new InternalServerError("Failed to create product in DynamoDB");
    }
}

async function getDynamoDBProductById(id: UUID): Promise<GetProductByIdResponseDTO | null> {
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

        return response.Item as GetProductByIdResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch product from DynamoDB");
    }
}

async function getDynamoDBAllProducts(): Promise<GetAllProductsResponseDTO> {
    const params: ScanCommandInput = {
        TableName: TABLE_NAME,
    };

    try {
        const command = new ScanCommand(params);
        const response = await dynamoDBClient.send(command);

        if (!response.Items) {
            return [];
        }

        return response.Items as GetAllProductsResponseDTO;
    } catch (error) {
        throw new InternalServerError("Failed to fetch all products from DynamoDB");
    }
}

async function getDynamoDBAllProductsByEstablishmentId(establishmentId: UUID): Promise<Product[]> {
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

        return response.Items as Product[];
    } catch (error) {
        throw new InternalServerError("Failed to fetch all products by establishment ID from DynamoDB");
    }
}

async function updateDynamoDBProductById(id: UUID, updateProductData: UpdateProductByIdRequestDTO): Promise<UpdateProductByIdResponseDTO> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updateProductData).forEach(([key, value]) => {
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

        if (!response.Attributes) throw new NotFoundError("Product not found");

        return response.Attributes as UpdateProductByIdResponseDTO;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }

        throw new InternalServerError("Failed to update Product in DynamoDB");
    }
}

async function deleteDynamoDBProductById(id: UUID): Promise<void> {
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
        throw new InternalServerError("Failed to delete product from DynamoDB");
    }
}

export {
    createDynamoDBProduct,
    getDynamoDBProductById,
    getDynamoDBAllProducts,
    getDynamoDBAllProductsByEstablishmentId,
    updateDynamoDBProductById,
    deleteDynamoDBProductById,
};
