import { initializeSocketConnection } from "../services/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../services/chat.api.js";

import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../chatSlice.js";

import { useDispatch, useSelector } from "react-redux";


export const useChat = () => {
  const dispatch = useDispatch();

  const { chats, currentChatId } = useSelector((state) => state.chat);

  const handleSendMessage = async ({ message, chatId }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await sendMessage({
        message,
        chatId,
      });

      const { chat, aiMessage } = data;

      const activeChatId = chatId || chat._id;

      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }

      dispatch(
        addNewMessage({
          chatId: activeChatId,
          content: message,
          role: "user",
        }),
      );

      dispatch(
        addNewMessage({
          chatId: activeChatId,
          content: aiMessage,
          role: "ai",
        }),
      );

      dispatch(setCurrentChatId(activeChatId));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetChats = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getChats();
      const { chats } = data;

      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };

            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOpenChat = async (chatId, chats) => {
    try {
      const chat = chats[chatId];

      if (chat?.messages?.length === 0) {
        dispatch(setLoading(true));

        const data = await getMessages(chatId);

        const formattedMessages = data.messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
        }));

        dispatch(
          addMessages({
            chatId,
            messages: formattedMessages,
          }),
        );
      }

      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await deleteChat(chatId);

      dispatch(
        setChats(
          Object.fromEntries(
            Object.entries(chats).filter(([id]) => id !== chatId),
          ),
        ),
      );

      if (currentChatId === chatId) {
        dispatch(setCurrentChatId(null));
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
  };
};
