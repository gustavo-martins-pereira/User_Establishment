import { CreateEstablishmentRuleRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { createEstablishmentRule } from "@repositories/establishmentRuleRepository.ts";

async function createEstablishmentRuleUsecase(establishmentRuleData: CreateEstablishmentRuleRequestDTO) {
    return await createEstablishmentRule(establishmentRuleData);
}

export {
    createEstablishmentRuleUsecase,
};
