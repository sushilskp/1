
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || "";

export const sendMessageToGuide = async (message: string, history: ChatMessage[], userContext: any) => {
  if (!API_KEY) {
    return "Error: API Key not configured. Please check environment variables.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are 'Mera Guide', an AI mentor for Growth AI.
    Your personality: Empathetic, brutally honest when needed, concise, and focused on execution.
    Current User Context: ${JSON.stringify(userContext)}
    
    Rules:
    1. NEVER change the user's 'Final Decision' which is already locked in the system.
    2. If the user is confused, explain the reasoning behind the current decision.
    3. If the user says "samajh nahi aaya", break it down into simpler steps or examples.
    4. If the user reports an emotional scale <= 2, focus on mental safety and suggest a break (Emotional Lock logic).
    5. Always encourage consistent execution of daily tasks.
    6. Language: Use Hinglish (Hindi + English mix) as the user is Gen Z from India.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `System Context: ${systemInstruction}` }] },
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Let's try again in a bit.";
  }
};
