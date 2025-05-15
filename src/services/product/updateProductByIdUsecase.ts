import { UUID } from "node:crypto";

import { UpdateProductByIdRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { UpdateProductByIdResponseDTO } from "@models/product/response/productResponseDTO.ts";
import { updateProductById } from "@repositories/productRepository.ts";

async function updateProductByIdUsecase(id: UUID, establishmentData: UpdateProductByIdRequestDTO): Promise<UpdateProductByIdResponseDTO | null> {
    return await updateProductById(id, establishmentData);
}

export {
    updateProductByIdUsecase,
}; 