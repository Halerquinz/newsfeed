import { Router } from "express";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.post('/:userId',isAuth, followController.followUser)
router.delete('/:userId',isAuth, followController.unFollowUser)

export default router
