import { UUID } from "node:crypto";

import { GetEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { getEstablishmentById } from "@repositories/establishmentRepository.ts";

async function getEstablishmentByIdUsecase(id: UUID): Promise<GetEstablishmentByIdResponseDTO | null> {
    return await getEstablishmentById(id);
}

export {
    getEstablishmentByIdUsecase,
}; 