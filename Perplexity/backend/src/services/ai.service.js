import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import axios from "axios";

const gemeniModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3.5-flash-lite",
});

export const generateResponse = async (messages) => {
  const response = await gemeniModel.invoke(messages.map(msg=>{
    if(msg.role=="user"){
      return HumanMessage(msg.content)
    }else if(msg.role=="ai"){
      return AIMessage(msg.content)
    }
  }));

  return response.text;
};

export const generateChatTitle = async (message) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "Generate a concise chat title in 2-4 words. Return only the title, no quotes or explanation.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.choices[0].message.content.trim();
};