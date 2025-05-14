import { UUID } from "node:crypto";

import { deleteUserById } from "@repositories/userRepository.ts";

async function deleteUserByIdUsecase(id: UUID): Promise<void> {
    await deleteUserById(id);
}

export {
    deleteUserByIdUsecase,
}; 