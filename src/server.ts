import express from "express";
import { errorHandler } from "@middlewares/errorHandler.ts";
import "@configs/env.ts";
import { createTables } from "@aws/dynamoDB/createTables.ts";
import routes from "@routes/routes.ts";

// AWS
// DynamoDB
createTables();

// EXPRESS
const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
