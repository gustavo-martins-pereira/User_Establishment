import { UUID } from "node:crypto";

import { createDynamoDBProduct, deleteDynamoDBProductById, getDynamoDBAllProducts, getDynamoDBAllProductsByEstablishmentId, getDynamoDBProductById, updateDynamoDBProductById } from "@aws/dynamoDB/services/productDynamoDBService.ts";
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

async function getAllProductsByEstablishmentId(establishmentId: UUID) {
    return await getDynamoDBAllProductsByEstablishmentId(establishmentId);
}

async function updateProductById(id: UUID, productData: UpdateProductByIdRequestDTO): Promise<UpdateProductByIdResponseDTO> {
    return await updateDynamoDBProductById(id, productData);
}

async function deleteProductById(id: UUID): Promise<void> {
    await deleteDynamoDBProductById(id);
}

export {
    createProduct,
    getProductById,
    getAllProducts,
    getAllProductsByEstablishmentId,
    updateProductById,
    deleteProductById,
};
