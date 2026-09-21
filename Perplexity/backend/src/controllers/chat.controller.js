import chatModel from "../models/chat.model.js";
import {
  generateResponse,
  generateChatTitle,
} from "../services/ai.service.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, chat: chatId } = req.body;

    let title = null;
    let chat = null;

    // New chat
    if (!chatId) {
      title = await generateChatTitle(message);

      chat = await chatModel.create({
        user: req.userId,
        title,
      });
    } else {
      // Existing chat
      chat = await chatModel.findOne({
        _id: chatId,
        user: req.userId,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
          success: false,
        });
      }
    }

    await messageModel.create({
      chat: chat._id,
      content: message,
      role: "user",
    });

    const messages = await messageModel.find({
      chat: chat._id,
    });

    const result = await generateResponse(messages);

    await messageModel.create({
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
  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);

    res.status(500).json({
      message: "Failed to send message",
      success: false,
      error: error.message,
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await chatModel.find({
      user: req.userId,
    });

    res.status(200).json({
      message: "Chats fetched",
      chats,
    });
  } catch (error) {
    console.log("GET CHATS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
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

    res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("GET MESSAGES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

export const deleteChats = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.userId,
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
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CHAT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete chat",
      error: error.message,
    });
  }
};