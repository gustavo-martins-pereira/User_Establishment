import { Product } from "../product.ts";

type CreateProductRequestDTO = Omit<Product, "id" | "createdAt" | "updatedAt">;

export {
    CreateProductRequestDTO,
};
