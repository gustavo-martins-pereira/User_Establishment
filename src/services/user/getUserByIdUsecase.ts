import { UUID } from "node:crypto";

import { GetUserByIdResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { getUserById } from "@repositories/userRepository.ts";

async function getUserByIdUsecase(id: UUID): Promise<GetUserByIdResponseDTO | null> {
    return await getUserById(id);
}

export {
    getUserByIdUsecase,
}; 