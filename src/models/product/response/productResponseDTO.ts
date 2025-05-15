import { Product } from "../product.ts";

type CreateProductResponseDTO = Product;
type GetProductByIdResponseDTO = Product;
type GetAllProductsResponseDTO = Product[];
type UpdateProductByIdResponseDTO = Product;

export {
    CreateProductResponseDTO,
    GetProductByIdResponseDTO,
    GetAllProductsResponseDTO,
    UpdateProductByIdResponseDTO,
};
