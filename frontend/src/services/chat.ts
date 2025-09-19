
import api from './api';

export const getSessions = async () => {
  const response = await api.get('/chat/sessions');
  return response.data;
};

export const sendMessage = async (data: any) => {
  const response = await api.post('/chat/send', data);
  return response.data;
};

export const getHistory = async (sessionId: string) => {
  const response = await api.get(`/chat/history/${sessionId}`);
  return response.data;
};
