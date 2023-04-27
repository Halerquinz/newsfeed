import { Router } from "express";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post("/:userId", isAuth, followController.followUser);
export default router;
