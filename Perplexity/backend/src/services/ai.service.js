import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from "langchain";
import { tavily } from "@tavily/core";
import axios from "axios";

const gemeniModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3.5-flash-lite",
});

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const generateResponse = async (messages) => {
  try {
    const latestMessage = messages[messages.length - 1];

    const searchResponse = await tvly.search(latestMessage.content, {
      searchDepth: "advanced",
      maxResults: 5,
    });

    const webContext = searchResponse.results
      .map(
        (result, index) =>
          `Source ${index + 1}:
Title: ${result.title}
URL: ${result.url}
Content: ${result.content}`,
      )
      .join("\n\n");

    const systemMessage = new SystemMessage(`
You are a helpful AI assistant.

You have access to live web search results.

Use the web search results when answering questions about:
- latest news
- current events
- recent updates
- current facts
- recent technology releases
- sports results
- current people or companies
- anything that may have changed recently

Use the provided web results as your source of current information.

If the web results are not relevant to the user's question, rely on your general knowledge instead.

Do not mention that you are using Tavily unless the user asks.

When web sources are used, include the relevant source URLs at the end of the answer under:

Sources:
- URL
- URL

WEB SEARCH RESULTS:

${webContext}
`);

    const conversationMessages = messages.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      }

      if (msg.role === "ai") {
        return new AIMessage(msg.content);
      }

      return null;
    }).filter(Boolean);

    const response = await gemeniModel.invoke([
      systemMessage,
      ...conversationMessages,
    ]);

    return response.text;
  } catch (error) {
    console.log("AI RESPONSE ERROR:", error);

    throw error;
  }
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