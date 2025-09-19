
import axios from 'axios';

const promptTemplates = {
  ecoLearner: (
    message: string
  ) => `You are a friendly and helpful AI assistant for EcoLearners. Your goal is to teach users about environmental topics in a fun and engaging way. Here is the user's message: "${message}". Please provide a response that is easy to understand, age-appropriate, and includes actionable tips.`,
};

const getAIResponse = async (message: string): Promise<string> => {
  const prompt = promptTemplates.ecoLearner(message);

  // In a real application, you would make a request to an AI provider here.
  // For now, we will mock the response.
  const mockResponses = [
    'That is a great question! Reducing your carbon footprint is very important. One way to do this is to use public transportation or bike instead of driving.',
    'I am glad you are interested in learning more about the environment! A simple way to help is to recycle and compost your waste.',
    'Water conservation is a big deal. You can help by taking shorter showers and turning off the faucet when you brush your teeth.',
  ];

  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
};

export const callAI = async (message: string): Promise<string> => {
  try {
    const response = await getAIResponse(message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors (e.g., timeouts)
      if (error.code === 'ECONNABORTED') {
        return 'I am sorry, but I am having trouble connecting. Please try again later.';
      }
    }
    // Handle other errors
    return 'I am sorry, but I am having some trouble right now. Please try again later.';
  }
};
