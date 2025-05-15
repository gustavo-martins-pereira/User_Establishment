import { deleteProductById } from "@repositories/productRepository.ts";
import { UUID } from "node:crypto";

async function deleteProductByIdUsecase(id: UUID): Promise<void> {
    await deleteProductById(id);
}

export {
    deleteProductByIdUsecase,
}; 