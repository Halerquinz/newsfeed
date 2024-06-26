import { Router } from "express";
import commentController from "../controllers/commentController";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post("/", isAuth, commentController.addComment);
router.get("/:postId", isAuth, commentController.getComments);
router.put("/:commentId", isAuth, commentController.updateComment);
router.delete("/delete/:commentId", isAuth, commentController.deleteComment);

export default router;
