
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizePost = async (content: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please provide a concise, engaging 3-sentence summary of the following blog post content:\n\n${content}`,
    });
    return response.text;
  } catch (error) {
    console.error("Summary error:", error);
    return "Failed to generate summary.";
  }
};

export const chatWithAuthor = async (history: {role: string, content: string}[], postContent: string, question: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: `Based on the following blog content, answer my question. If the answer isn't in the text, use your knowledge but stay in the character of the author (Alex Rivers).\n\nBlog content: ${postContent}\n\nQuestion: ${question}` }] }
      ],
      config: {
        systemInstruction: "You are the author of this blog, Alex Rivers. You are helpful, insightful, and knowledgeable about technology and design. Keep your responses concise and friendly."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm sorry, I'm having trouble thinking right now. Could you ask again?";
  }
};

export const generatePostIdeas = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 creative blog post titles and short one-sentence outlines about the topic: ${topic}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              outline: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Idea generation error:", error);
    return [];
  }
};
