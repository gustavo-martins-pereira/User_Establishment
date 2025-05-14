import { UUID } from "node:crypto";

import { deleteEstablishmentById } from "@repositories/establishmentRepository.ts";

async function deleteEstablishmentByIdUsecase(id: UUID): Promise<void> {
    await deleteEstablishmentById(id);
}

export {
    deleteEstablishmentByIdUsecase,
}; 