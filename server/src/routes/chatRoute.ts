import { Router } from "express";
import chatController from "../controllers/chatController";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post("/create-chat/:userId", isAuth, chatController.createChat);
router.get("/", isAuth, chatController.userChat);
router.get("/find/:userId", isAuth, chatController.getChat);

export default router;
