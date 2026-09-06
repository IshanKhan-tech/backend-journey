import {Router} from 'express';
import { sendMessage, getChats, getMessages, deleteChats } from '../controllers/chat.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/message',authMiddleware, sendMessage);
router.get("/", authMiddleware, getChats)
router.get("/:chatId/messages", authMiddleware, getMessages)
router.delete("/delete/:chatId", authMiddleware, deleteChats)

export default router;