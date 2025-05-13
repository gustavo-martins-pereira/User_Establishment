import { User } from "../user.ts";

type CreateUserResponseDTO = Omit<User, "id">;

export {
    CreateUserResponseDTO,
};
