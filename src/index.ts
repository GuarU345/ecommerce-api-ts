import express from "express";
import { router } from "./routes/routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
