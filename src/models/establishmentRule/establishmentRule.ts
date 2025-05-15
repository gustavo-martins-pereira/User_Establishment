import { UUID } from "node:crypto";

interface EstablishmentRule {
    id: UUID;
    establishmentId: UUID;
    picturesLimit: number;
    videoLimit: number;
    createdAt: string;
    updatedAt: string;
};

export {
    EstablishmentRule,
};
