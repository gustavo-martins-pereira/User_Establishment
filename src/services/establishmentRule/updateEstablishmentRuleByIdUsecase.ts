import { UUID } from "node:crypto";

import { UpdateEstablishmentRuleByIdRequestDTO } from "@models/establishmentRule/request/establishmentRequestDTO.ts";
import { UpdateEstablishmentRuleByIdResponseDTO } from "@models/establishmentRule/response/establishmentResponseDTO.ts";
import { updateEstablishmentRuleById } from "@repositories/establishmentRuleRepository.ts";

async function updateEstablishmentRuleByIdUsecase(id: UUID, establishmentRuleData: UpdateEstablishmentRuleByIdRequestDTO): Promise<UpdateEstablishmentRuleByIdResponseDTO | null> {
    return await updateEstablishmentRuleById(id, establishmentRuleData);
}

export {
    updateEstablishmentRuleByIdUsecase,
};
