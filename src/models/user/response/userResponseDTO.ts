import { User } from "../user.ts";

type CreateUserResponseDTO = Omit<User, "id">;
type GetUserByIdResponseDTO = Omit<User, "id">;

export {
    CreateUserResponseDTO,
    GetUserByIdResponseDTO,
};
