import { User } from "../user.ts";

type CreateUserResponseDTO = User;
type GetUserByIdResponseDTO = User;
type GetAllUsersResponseDTO = User[];
type UpdateUserResponseDTO = User;

export {
    CreateUserResponseDTO,
    GetUserByIdResponseDTO,
    GetAllUsersResponseDTO,
    UpdateUserResponseDTO,
};
