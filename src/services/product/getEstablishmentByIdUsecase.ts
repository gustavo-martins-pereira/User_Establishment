import { UUID } from "node:crypto";

import { GetProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";
import { getProductById } from "@repositories/productRepository.ts";

async function getProductByIdUsecase(id: UUID): Promise<GetProductByIdResponseDTO | null> {
    return await getProductById(id);
}

export {
    getProductByIdUsecase,
}; 