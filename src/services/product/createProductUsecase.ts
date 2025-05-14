import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { createProduct } from "@repositories/productRepository.ts";

async function createProductUsecase(productData: CreateProductRequestDTO) {
    return await createProduct(productData);
}

export {
    createProductUsecase,
};
