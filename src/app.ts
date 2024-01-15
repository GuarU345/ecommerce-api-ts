import express from "express";
import cors from "cors";
import { router } from "./routes/routes";
import { handleError } from "./middlewares/error";

export const app = express();
export const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(handleError);
