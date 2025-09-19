
import api from './api';

export const getTips = async () => {
  const response = await api.get('/tips');
  return response.data;
};

export const getRandomTip = async () => {
  const response = await api.get('/tips/random');
  return response.data;
};

export const saveTip = async (data: any) => {
  const response = await api.post('/tips', data);
  return response.data;
};
