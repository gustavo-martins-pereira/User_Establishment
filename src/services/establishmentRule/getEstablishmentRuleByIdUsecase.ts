import { UUID } from "node:crypto";

import { GetEstablishmentRuleByIdResponseDTO } from "@models/establishmentRule/response/establishmentResponseDTO.ts";
import { getEstablishmentRuleById } from "@repositories/establishmentRuleRepository.ts";

async function getEstablishmentRuleByIdUsecase(id: UUID): Promise<GetEstablishmentRuleByIdResponseDTO | null> {
    return await getEstablishmentRuleById(id);
}

export {
    getEstablishmentRuleByIdUsecase,
};
