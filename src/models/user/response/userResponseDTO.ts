import { User } from "../user.ts";

type CreateUserResponseDTO = User;
type GetUserByIdResponseDTO = User;
type GetAllUsersResponseDTO = User[];
type UpdateUserByIdResponseDTO = User;

export {
    CreateUserResponseDTO,
    GetUserByIdResponseDTO,
    GetAllUsersResponseDTO,
    UpdateUserByIdResponseDTO,
};
