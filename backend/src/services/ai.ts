
import axios from 'axios';
import { getEnv } from '../utils/env'; // Assuming getEnv can read environment variables

const promptTemplates = {
  ecoLearner: (
    message: string
  ) => `You are a friendly and helpful AI assistant for EcoLearners. Your goal is to teach users about environmental topics in a fun and engaging way. Here is the user\'s message: "${message}". Please provide a response that is easy to understand, age-appropriate, and includes actionable tips.`,
};

const getAIResponse = async (message: string): Promise<string> => {
  const prompt = promptTemplates.ecoLearner(message);
  const geminiApiKey = getEnv('GEMINI_API_KEY'); // Use this in a real application

  if (!geminiApiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    return 'I am sorry, but my AI capabilities are not configured. Please ask the developer to set up the GEMINI_API_KEY.';
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, // UPDATED ENDPOINT AND MODEL
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
      }
    );

    // Extract the AI\'s response
    const aiText = response.data.candidates[0]?.content?.parts[0]?.text;
    if (aiText) {
      return aiText;
    } else {
      console.error('Gemini API response did not contain expected text:', response.data);
      return 'I received a response from the AI, but it was empty or malformed. Please try again.';
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Gemini API Error Response Data:', error.response.data);
        console.error('Gemini API Error Response Status:', error.response.status);
        console.error('Gemini API Error Response Headers:', error.response.headers);
        return `I encountered an error communicating with the AI: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`;
      } else if (error.request) {
        // The request was made but no response was received
        return 'I did not receive a response from the AI. Please check your internet connection or try again later.';
      } else {
        // Something happened in setting up the request that triggered an Error
        return 'An unexpected error occurred while setting up the AI request. Please try again later.';
      }
    }
    return 'An unknown error occurred while trying to get an AI response. Please try again later.';
  }
};

export const callAI = async (message: string): Promise<string> => {
  try {
    const response = await getAIResponse(message);
    return response;
  } catch (error) {
    console.error(error);
    return 'I am sorry, but I am having some trouble right now. Please try again later.';
  }
};
