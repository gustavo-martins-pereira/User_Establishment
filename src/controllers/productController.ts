import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UUID } from "node:crypto";

import { CreateProductRequestDTO, UpdateProductByIdRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { createProductUsecase } from "@services/product/createProductUsecase.ts";
import { BadRequestError, NotFoundError } from "@utils/errors/AppError.ts";
import { getProductByIdUsecase } from "@services/product/getProductByIdUsecase.ts";
import { getAllProductsUsecase } from "@services/product/getAllProductsUsecase.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { updateProductByIdUsecase } from "@services/product/updateProductByIdUsecase.ts";

async function createProduct(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const productData: CreateProductRequestDTO = request.body;

        const isProductExists = await getProductByIdUsecase(productData.establishmentId);
        if(!isProductExists) throw new NotFoundError("Product not found");

        const Product = await createProductUsecase(productData);

        response.status(201).json(Product);
    } catch (error) {
        next(error);
    }
}

async function getProductById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const { id } = request.params;

        const product = await getProductByIdUsecase(id as UUID);
        if(!product) throw new NotFoundError("Product not found");

        response.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

async function getAllProducts(request: Request, response: Response, next: NextFunction) {
    try {
        const products = await getAllProductsUsecase();

        response.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

async function updateProductById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const { id } = request.params;
        const productData: UpdateProductByIdRequestDTO = request.body;

        const isProductExists = await getProductByIdUsecase(id as UUID);
        if(!isProductExists) throw new NotFoundError("Product not found");

        const isEstablishmentExists = await getEstablishmentByIdUsecase(productData.establishmentId as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment id not found");

        const product = await updateProductByIdUsecase(id as UUID, productData);

        response.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export {
    createProduct,
    getProductById,
    getAllProducts,
    updateProductById,
};
