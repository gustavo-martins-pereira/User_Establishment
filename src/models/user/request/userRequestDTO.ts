import { User } from "../user.ts";

type CreateUserRequestDTO = Omit<User, "id" | "createdAt" | "updatedAt">;

type UpdateUserRequestDTO = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;

export {
    CreateUserRequestDTO,
    UpdateUserRequestDTO,
};
