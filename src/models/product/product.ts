import { UUID } from "node:crypto";

interface Product {
    id: UUID;
    name: string;
    price: number;
    establishmentId: UUID;
    createdAt: string;
    updatedAt: string;
};

export {
    Product,
};
