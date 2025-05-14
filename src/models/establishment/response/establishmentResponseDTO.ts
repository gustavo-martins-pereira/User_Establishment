import { Establishment } from "../establishment.ts";

type CreateEstablishmentResponseDTO = Establishment;
type GetEstablishmentByIdResponseDTO = Establishment;
type GetAllEstablishmentsResponseDTO = Establishment[];
type UpdateEstablishmentByIdResponseDTO = Establishment;

export {
    CreateEstablishmentResponseDTO,
    GetEstablishmentByIdResponseDTO,
    GetAllEstablishmentsResponseDTO,
    UpdateEstablishmentByIdResponseDTO,
};
