import { UUID } from "node:crypto";

import { UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { UpdateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { updateUser } from "@repositories/userRepository.ts";
import { getUserByIdUsecase } from "./getUserByIdUsecase.ts";

async function updateUserUsecase(id: UUID, userData: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO | null> {
    return await updateUser(id, userData);
}

export {
    updateUserUsecase,
}; 