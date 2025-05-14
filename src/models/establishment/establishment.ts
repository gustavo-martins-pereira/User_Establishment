import { UUID } from "node:crypto";

enum ESTABLISHMENT_TYPE {
    OWNER = "SHOPPING",
    CUSTOMER = "LOCAL",
};

interface Establishment {
    id: UUID;
    name: string;
    ownerId: UUID;
    type: ESTABLISHMENT_TYPE;
    createdAt: string;
    updatedAt: string;
};

export {
    Establishment,
    ESTABLISHMENT_TYPE,
};
