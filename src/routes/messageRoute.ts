import express from 'express';
import { getMessages, updateMessage, deleteMessage, getUnreadMessages, sendMessage, getChatMessages, getAllChats } from '../controllers/messageController';

const router = express.Router();

router.get('/', getMessages);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.get('/unread/:userId', getUnreadMessages);
router.post('/send', sendMessage);           // Ruta para enviar mensaje
router.get('/chat/:chatId', getChatMessages); // Ruta para obtener mensajes de un chat
router.get('/allChats', getAllChats);         // Ruta para obtener todos los chats

export default router;
