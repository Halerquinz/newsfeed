import { Router } from "express";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post("/:userId", isAuth, followController.followUser);
<<<<<<< HEAD
router.get("/", isAuth, followController.getUserFollow);

router.delete("/:userId", isAuth, followController.unFollowUser);

=======

>>>>>>> 30df116d1829ddcbc650491b58c7aef15017e759
export default router;
