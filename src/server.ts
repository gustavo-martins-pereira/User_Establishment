import express from "express";

import "@configs/env.ts";
import { createTables } from "@aws/dynamoDB/createTables.ts";

// AWS
// DynamoDB
createTables();

// EXPRESS
const app = express();

app.listen(3000, () => {
    console.log("App listening on port " + 3000);
});
