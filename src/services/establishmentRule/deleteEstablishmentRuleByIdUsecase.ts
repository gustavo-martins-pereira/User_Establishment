import { deleteEstablishmentRuleById } from "@repositories/establishmentRuleRepository.ts";
import { UUID } from "node:crypto";

async function deleteEstablishmentRuleByIdUsecase(id: UUID): Promise<void> {
    await deleteEstablishmentRuleById(id);
}

export {
    deleteEstablishmentRuleByIdUsecase,
};
