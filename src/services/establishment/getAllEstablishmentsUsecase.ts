import { GetAllEstablishmentsResponseDTO } from "@models/establishment/response/establishmentResponseDTO.ts";
import { getAllEstablishments } from "@repositories/establishmentRepository.ts";

async function getAllEstablishmentsUsecase(): Promise<GetAllEstablishmentsResponseDTO | null> {
    return await getAllEstablishments();
}

export {
    getAllEstablishmentsUsecase,
}; 