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

export {
    USER_TYPE,
    User,
};
