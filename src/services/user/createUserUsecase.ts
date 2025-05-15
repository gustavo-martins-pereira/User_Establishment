import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { createUser } from "@repositories/userRepository.ts";

async function createUserUsecase(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null> {
    return await createUser(userData);
}

export {
    createUserUsecase,
};
