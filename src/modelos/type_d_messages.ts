import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true }, // Identificador único del chat
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  tags: { type: [String], default: [] }
});

export default mongoose.model('Message', messageSchema);

