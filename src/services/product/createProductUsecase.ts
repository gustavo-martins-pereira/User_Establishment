import { CreateProductRequestDTO } from "@models/product/request/productRequestDTO.ts";
import { getEstablishmentRuleByEstablishmentId } from "@repositories/establishmentRuleRepository.ts";
import { createProduct, getAllProductsByEstablishmentId } from "@repositories/productRepository.ts";
import { BadRequestError } from "@utils/errors/AppError.ts";

async function createProductUsecase(productData: CreateProductRequestDTO) {
    const products = await getAllProductsByEstablishmentId(productData.establishmentId);
    const establishmentRule = await getEstablishmentRuleByEstablishmentId(productData.establishmentId);

    if(!establishmentRule) throw new BadRequestError("The establishment associated with this product does hasn't an establishment rule to create a product");
    
    if(products.length >= establishmentRule.picturesLimit) throw new BadRequestError("This establishment has already reached the product limit");

    return await createProduct(productData);
}

export {
    createProductUsecase,
};
