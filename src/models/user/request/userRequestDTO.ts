import { User } from "../user.ts";

type CreateUserRequestDTO = Omit<User, "id">;

export {
    CreateUserRequestDTO,
};
