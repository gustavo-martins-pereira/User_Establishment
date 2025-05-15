import { Request, Response, NextFunction } from "express";
import { UUID } from "node:crypto";

import { CreateProductRequestDTO, UpdateProductByIdRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { createProductUsecase } from "@services/product/createProductUsecase.ts";
import { NotFoundError } from "@utils/errors/AppError.ts";
import { getProductByIdUsecase } from "@services/product/getProductByIdUsecase.ts";
import { getAllProductsUsecase } from "@services/product/getAllProductsUsecase.ts";
import { getEstablishmentByIdUsecase } from "@services/establishment/getEstablishmentByIdUsecase.ts";
import { updateProductByIdUsecase } from "@services/product/updateProductByIdUsecase.ts";
import { deleteProductByIdUsecase } from "@services/product/deleteProductByIdUsecase.ts";
import { handleExpressValidation } from "@utils/handles/handleExpressValidation.ts";
import { removeUndefinedProperties } from "@utils/object.ts";

async function createProduct(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const {
            name,
            price,
            establishmentId,
        }: CreateProductRequestDTO = request.body;

        const isEstablishmentExists = await getEstablishmentByIdUsecase(establishmentId);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        const Product = await createProductUsecase({ name, price, establishmentId } as CreateProductRequestDTO);

        response.status(201).json(Product);
    } catch (error) {
        next(error);
    }
}

async function getProductById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

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
        handleExpressValidation(request);

        const { id } = request.params;
        const {
            name,
            price,
            establishmentId,
        }: UpdateProductByIdRequestDTO = request.body;

        const isProductExists = await getProductByIdUsecase(id as UUID);
        if(!isProductExists) throw new NotFoundError("Product not found");

        const isEstablishmentExists = await getEstablishmentByIdUsecase(establishmentId as UUID);
        if(!isEstablishmentExists) throw new NotFoundError("Establishment not found");

        const product = await updateProductByIdUsecase(
            id as UUID,
            removeUndefinedProperties({ name, price, establishmentId } as UpdateProductByIdRequestDTO)
        );

        response.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

async function deleteProductById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const isProductExists = await getProductByIdUsecase(id as UUID);
        
        if(!isProductExists) throw new NotFoundError("Product not found");

        await deleteProductByIdUsecase(id as UUID);

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export {
    createProduct,
    getProductById,
    getAllProducts,
    updateProductById,
    deleteProductById,
};
