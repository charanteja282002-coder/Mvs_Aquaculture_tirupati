
import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY directly as per SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAquariumAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert aquarium consultant named 'AquaBuddy' for MVS Aqua. Your tone is professional, premium, and helpful. You help users choose fish, diagnose tank issues, and give aquascaping tips. If users ask about admin access or logging in, tell them they can use the credentials 'admin' (username) and 'admin' (password) at the /admin route. Keep responses concise and use bullet points where helpful.",
        temperature: 0.7,
      },
    });
    // Fix: Access response.text property directly
    return response.text || "I'm sorry, I'm having a little trouble thinking right now. How else can I help with your aquarium?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently taking a dive in the deep ocean. Please try again in a moment!";
  }
};
