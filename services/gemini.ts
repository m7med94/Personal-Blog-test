
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

/**
 * Initialize the Google GenAI client.
 * Always use the named parameter apiKey and get it from process.env.API_KEY.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Summarizes the blog post content using the Gemini 3 Flash model.
 */
export async function summarizePost(postContent: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ 
      parts: [{ text: `Provide a very brief (one or two sentences) summary of this blog post:\n\n${postContent}` }] 
    }],
  });
  // Use the .text property to access the generated content.
  return response.text || "Summary unavailable.";
}

/**
 * Simulates a conversation with the blog post author.
 * Maintains context by passing the chat history to the model.
 */
export async function chatWithAuthor(history: ChatMessage[], postContent: string, message: string): Promise<string> {
  // Map internal ChatMessage format (user/assistant) to Gemini's expected roles (user/model).
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  
  // Add the current user message to the conversation context.
  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: `You are the author of the blog post provided below. 
      Respond to the user's questions or comments as if you are that author. 
      Be helpful, concise, and professional.
      
      Post Content:
      ${postContent}`,
    }
  });
  
  return response.text || "I'm sorry, I'm having trouble responding right now.";
}

/**
 * Generates structured blog post ideas based on a given topic using JSON response mode.
 */
export async function generatePostIdeas(topic: string): Promise<{title: string, outline: string}[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ 
      parts: [{ text: `Give me 3 innovative blog post ideas for the topic: "${topic}". Include a catchy title and a short outline for each.` }] 
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING,
              description: "The title of the suggested blog post."
            },
            outline: { 
              type: Type.STRING,
              description: "A 1-2 sentence description of the content."
            }
          },
          // Removed 'required' as per Gemini SDK best practices for strict schema adherence using propertyOrdering.
          propertyOrdering: ["title", "outline"]
        }
      },
    }
  });

  try {
    // Parse the JSON string from the .text property after trimming whitespace.
    const jsonStr = (response.text || "[]").trim();
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini Idea Generation Error:", err);
    return [];
  }
}
