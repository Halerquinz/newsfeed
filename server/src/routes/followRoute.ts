import { Router } from "express";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post("/:userId", isAuth, followController.followUser);
router.get("/getFollowing/:userId", isAuth, followController.getFollowing);
router.get("/getFollowed/:userId", isAuth, followController.getFollowed);
export default router;
