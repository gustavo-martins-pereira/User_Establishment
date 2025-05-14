import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { createEstablishment } from "@repositories/establishmentRepository.ts";

async function createEstablishmentUsecase(establishmentData: CreateEstablishmentRequestDTO) {
    return await createEstablishment(establishmentData);
}

export {
    createEstablishmentUsecase,
};
