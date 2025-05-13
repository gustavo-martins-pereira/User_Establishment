import { createTables } from "@aws/dynamoDB/createTables.ts";
import "@configs/env.ts";

await createTables();