import { UUID } from "node:crypto";

import { createDynamoDBProduct, getDynamoDBAllProducts, getDynamoDBProductById } from "@aws/dynamoDB/services/productDynamoDBService.ts";
import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { CreateProductResponseDTO, GetAllProductsResponseDTO, GetProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";

async function createProduct(productData: CreateProductRequestDTO): Promise<CreateProductResponseDTO | null> {
    return await createDynamoDBProduct(productData);
}

async function getProductById(id: UUID): Promise<GetProductByIdResponseDTO | null> {
    return await getDynamoDBProductById(id);
}

async function getAllProducts(): Promise<GetAllProductsResponseDTO> {
    return await getDynamoDBAllProducts();
}

export {
    createProduct,
    getProductById,
    getAllProducts,
};
