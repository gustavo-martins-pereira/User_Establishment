import { UUID } from "node:crypto";

enum USER_TYPE {
    OWNER = "OWNER",
    CUSTOMER = "CUSTOMER",
};

interface User {
    id: UUID;
    name: string;
    email: string;
    type: USER_TYPE;
};

type CreateUserDTO = Omit<User, "id">;

export {
    CreateUserDTO,
    USER_TYPE,
};
