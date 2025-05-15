import { EstablishmentRule } from "../establishmentRule.ts";

type CreateEstablishmentRuleRequestDTO = Omit<EstablishmentRule, "id" | "createdAt" | "updatedAt">;

type UpdateEstablishmentRuleByIdRequestDTO = Partial<Omit<EstablishmentRule, "id" | "createdAt" | "updatedAt">>;

export {
    CreateEstablishmentRuleRequestDTO,
    UpdateEstablishmentRuleByIdRequestDTO,
};
