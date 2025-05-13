import { User } from "../user.ts";

type CreateUserResponseDTO = Omit<User, "id" | "createdAt" | "updatedAt">;
type GetUserByIdResponseDTO = User;
type UpdateUserResponseDTO = User;

export {
    CreateUserResponseDTO,
    GetUserByIdResponseDTO,
    UpdateUserResponseDTO,
};
