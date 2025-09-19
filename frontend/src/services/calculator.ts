
import api from './api';

export const calculateFootprint = async (data: any) => {
  const response = await api.post('/calculator/calculate', data);
  return response.data;
};

export const getFootprint = async () => {
  const response = await api.get('/calculator/footprint');
  return response.data;
};
