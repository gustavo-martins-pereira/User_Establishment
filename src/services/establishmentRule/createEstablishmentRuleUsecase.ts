import { CreateEstablishmentRuleRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { createEstablishmentRule, getEstablishmentRuleByEstablishmentId } from "@repositories/establishmentRuleRepository.ts";
import { BadRequestError } from "@utils/errors/AppError.ts";

async function createEstablishmentRuleUsecase(establishmentRuleData: CreateEstablishmentRuleRequestDTO) {
    const establishmentRule = await getEstablishmentRuleByEstablishmentId(establishmentRuleData.establishmentId);
    if(establishmentRule) throw new BadRequestError("Already exists an establishment rule associated with this establishment");

    return await createEstablishmentRule(establishmentRuleData);
}

export {
    createEstablishmentRuleUsecase,
};
