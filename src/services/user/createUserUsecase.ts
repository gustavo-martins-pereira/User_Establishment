import { CreateUserDTO } from "@models/user.ts";
import { createUser } from "@repositories/userRepository.ts";

async function createUserUsecase(userData: CreateUserDTO) {
    await createUser(userData);
}

export {
    createUserUsecase,
};
