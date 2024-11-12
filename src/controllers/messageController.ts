import { Request, Response } from 'express';
import Message from '../modelos/type_d_messages';

// Función para enviar un mensaje
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Función para obtener todos los mensajes
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Función para actualizar un mensaje
export const updateMessage = async (req: Request, res: Response) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Función para eliminar un mensaje
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Función para obtener mensajes no leídos de un usuario
export const getUnreadMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ receiverId: req.params.userId, isRead: false });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Función para obtener todos los chats únicos
export const getAllChats = async (_req: Request, res: Response) => {
  try {
    const chats = await Message.aggregate([
      {
        $group: {
          _id: { senderId: "$senderId", receiverId: "$receiverId" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.senderId",
          foreignField: "_id",
          as: "sender"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.receiverId",
          foreignField: "_id",
          as: "receiver"
        }
      },
      {
        $project: {
          senderName: { $arrayElemAt: ["$sender.name", 0] },
          receiverName: { $arrayElemAt: ["$receiver.name", 0] }
        }
      }
    ]);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Función para obtener mensajes de un chat específico
export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
