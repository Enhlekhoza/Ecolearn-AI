
import api from './api';

export const signup = async (data: any) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await api.post('/auth/login', data);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
