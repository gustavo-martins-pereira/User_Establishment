import { GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { randomUUID, UUID } from "node:crypto";

import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { CreateProductResponseDTO, GetAllProductsResponseDTO, GetProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";
import { dynamoDBClient } from "../awsClient.ts";
import { InternalServerError } from "@utils/errors/AppError.ts";

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

export {
    createDynamoDBProduct,
    getDynamoDBProductById,
    getDynamoDBAllProducts,
};
