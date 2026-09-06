import chatModel from "../models/chat.model.js";
import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const { message, chat: chatId } = req.body;

  let title = null,
    chat = null;

  if (!chatId) {
    title = await generateChatTitle(message);
    chat = await chatModel.create({
      user: req.userId,
      title,
    });
  }

  const userMessage = await messageModel.create({
    chat: chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId });

  const result = await generateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chat._id,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    aiMessage: result,
    title,
    chat,
    message,
  });
};

export const getChats = async (req, res) => {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(201).json({
    message: "chats fetched",
    chats,
  });
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.userId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(201).json({
    message: "message fetched successfully",
  });
};

export const deleteChats = async (req, res) => {
  const chatId = req.params;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });
  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  await messageModel.deleteMany({
    chat: chatId,
  });

  res.status(200).json({
    message: "Chat not found",
  });
};
