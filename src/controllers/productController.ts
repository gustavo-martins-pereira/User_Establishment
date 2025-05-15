import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UUID } from "node:crypto";

import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { createProductUsecase } from "@services/product/createProductUsecase.ts";
import { BadRequestError, NotFoundError } from "@utils/errors/AppError.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { getProductByIdUsecase } from "@services/product/getEstablishmentByIdUsecase.ts";

async function createProduct(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const productData: CreateProductRequestDTO = request.body;

        const isEstablishmentExists = await getEstablishmentByIdUsecase(productData.establishmentId);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

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

export {
    createProduct,
    getProductById,
};
