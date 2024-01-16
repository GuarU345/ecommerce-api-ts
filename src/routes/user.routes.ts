import { Router } from "express";
import { userController } from "../utils/instances";

const router = Router();

router.post("/signup", userController.create);

export const userRouter = router;
