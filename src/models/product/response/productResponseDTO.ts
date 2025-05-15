import { Product } from "../product.ts";

type CreateProductResponseDTO = Product;
type GetProductByIdResponseDTO = Product;
type GetAllProductsResponseDTO = Product[];

export {
    CreateProductResponseDTO,
    GetProductByIdResponseDTO,
    GetAllProductsResponseDTO,
};
