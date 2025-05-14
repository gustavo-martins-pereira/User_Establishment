import { createDynamoDBProduct } from "@aws/dynamoDB/services/productDynamoDBService.ts";
import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { CreateProductResponseDTO } from "@models/product/response/productResponseDTO.ts";

async function createProduct(productData: CreateProductRequestDTO): Promise<CreateProductResponseDTO | null> {
    return await createDynamoDBProduct(productData);
}

export {
    createProduct,
};
