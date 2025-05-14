import { UUID } from "node:crypto";

import { UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { UpdateUserByIdResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { updateUserById } from "@repositories/userRepository.ts";

async function updateUserByIdUsecase(id: UUID, userData: UpdateUserRequestDTO): Promise<UpdateUserByIdResponseDTO | null> {
    return await updateUserById(id, userData);
}

export {
    updateUserByIdUsecase,
}; 