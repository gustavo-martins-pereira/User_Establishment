import { UUID } from "node:crypto";

import { deleteUser } from "@repositories/userRepository.ts";

async function deleteUserUsecase(id: UUID): Promise<void> {
    await deleteUser(id);
}

export {
    deleteUserUsecase,
}; 