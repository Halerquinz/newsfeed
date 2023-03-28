import { Router } from "express"
import messageController from "../controllers/messageController"
import isAuth from "../middlewares/isAuth"
const router = Router()

router.get('/:chatId', isAuth, messageController.getMessages)
router.post('/', isAuth, messageController.addMessage)

export default router
