import { UUID } from "node:crypto";

import { createDynamoDBProduct, getDynamoDBAllProducts, getDynamoDBProductById, updateDynamoDBProductById } from "@aws/dynamoDB/services/productDynamoDBService.ts";
import { CreateProductRequestDTO, UpdateProductByIdRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { CreateProductResponseDTO, GetAllProductsResponseDTO, GetProductByIdResponseDTO, UpdateProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";

async function createProduct(productData: CreateProductRequestDTO): Promise<CreateProductResponseDTO | null> {
    return await createDynamoDBProduct(productData);
}

async function getProductById(id: UUID): Promise<GetProductByIdResponseDTO | null> {
    return await getDynamoDBProductById(id);
}

async function getAllProducts(): Promise<GetAllProductsResponseDTO> {
    return await getDynamoDBAllProducts();
}

async function updateProductById(id: UUID, productData: UpdateProductByIdRequestDTO): Promise<UpdateProductByIdResponseDTO> {
    return await updateDynamoDBProductById(id, productData);
}

export {
    createProduct,
    getProductById,
    getAllProducts,
    updateProductById,
};
