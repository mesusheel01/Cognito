import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_APPLICATION_CREDENTIALS);
async function getGeminiOutput(content, searchQuery) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Instructions: ${searchQuery}\nContent: ${content}\nProvide a brief analysis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (error) {
    console.error('Gemini Error:', error);
    throw error;
  }
}

const content = {
    createdAt: "2025-03-09T20:08:59.069Z",
    link: "https://www.youtube.com/watch?v=S2mkcXrYjT4",
    tags: ['67cdf55ac174dd0fe6db336b'],
    title: "youtube",
    type : "video"
  }

async function main() {
  try {
      const aiResponse = await getGeminiOutput(
          JSON.stringify(content),
          "Give the brief about the video!"
      );
      console.log(aiResponse);
  } catch (error) {
      console.error("Failed to get Gemini output:", error);
  }
}

main();
