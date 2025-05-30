import { Establishment } from "../establishment.ts";

type CreateEstablishmentRequestDTO = Omit<Establishment, "id" | "createdAt" | "updatedAt">;
type UpdateEstablishmentByIdRequestDTO = Partial<Omit<Establishment, "id" | "createdAt" | "updatedAt">>;

export {
    CreateEstablishmentRequestDTO,
    UpdateEstablishmentByIdRequestDTO,
};
