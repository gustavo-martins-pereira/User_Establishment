import { UUID } from "node:crypto";

import { UpdateEstablishmentByIdRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { UpdateEstablishmentByIdResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { updateEstablishmentById } from "@repositories/establishmentRepository.ts";

async function updateEstablishmentByIdUsecase(id: UUID, establishmentData: UpdateEstablishmentByIdRequestDTO): Promise<UpdateEstablishmentByIdResponseDTO | null> {
    return await updateEstablishmentById(id, establishmentData);
}

export {
    updateEstablishmentByIdUsecase,
}; 