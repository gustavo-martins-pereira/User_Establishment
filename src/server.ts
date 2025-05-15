import express from "express";
import "@configs/env.ts";
import routes from "@routes/routes.ts";

// EXPRESS
const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
