import {ChatGoogleGenerativeAI} from "@langchain/google-genai"

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3.5-flash-lite",
//   temperature: 0.7,
//   maxOutputTokens: 1024,
})

export async function testAi(){
    model.invoke("what is the capital of france").then((response) => {
        console.log(response)
    })
}