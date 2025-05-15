import { Product } from "../product.ts";

type CreateProductRequestDTO = Omit<Product, "id" | "createdAt" | "updatedAt">;

type UpdateProductByIdRequestDTO = Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>;

export {
    CreateProductRequestDTO,
    UpdateProductByIdRequestDTO,
};
