import { UUID } from "node:crypto";

import { GetEstablishmentRuleByIdResponseDTO } from "@models/establishmentRule/response/establishmentResponseDTO.ts";
import { getEstablishmentRuleByEstablishmentId } from "@repositories/establishmentRuleRepository.ts";

async function getEstablishmentRuleByEstablishmentIdUsecase(establishmentId: UUID): Promise<GetEstablishmentRuleByIdResponseDTO | null> {
    return await getEstablishmentRuleByEstablishmentId(establishmentId);
}

export {
    getEstablishmentRuleByEstablishmentIdUsecase,
};
