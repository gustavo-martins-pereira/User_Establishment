import { GetAllProductsResponseDTO } from "@models/product/response/productResponseDTO.ts";
import { getAllProducts } from "@repositories/productRepository.ts";

async function getAllProductsUsecase(): Promise<GetAllProductsResponseDTO | null> {
    return await getAllProducts();
}

export {
    getAllProductsUsecase,
}; 