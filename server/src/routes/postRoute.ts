import { Router } from "express";
import postController from "../controllers/postController";
import isAuth from "../middlewares/isAuth";
import { check, body } from "express-validator"
const router = Router()

// router.get('/timeline-post', postController.getTimelinePost)
router.post(
    '/create-post', 
    isAuth, 
    [
        body('desc')
            .isEmpty()
            .withMessage('body of post is empty')
    ], 
    postController.createPost
)
router.get('/:postId', isAuth, postController.getPost)
router.get('/', isAuth, postController.getPosts)
router.get('/user/:userId', isAuth, postController.getPostsOfUser)
router.put('/:postId', isAuth, postController.updatePost)
router.delete('/:postId', isAuth, postController.deletePost)

export default router
