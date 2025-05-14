import { ESTABLISHMENT_TYPE } from "@models/establishment/establishment.ts";
import { GetEstablishmentsByTypeResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { getEstablishmentsByType } from "@repositories/establishmentRepository.ts";

async function getEstablishmentsByTypeUsecase(type: ESTABLISHMENT_TYPE): Promise<GetEstablishmentsByTypeResponseDTO | null> {
    return await getEstablishmentsByType(type);
}

export {
    getEstablishmentsByTypeUsecase,
}; 