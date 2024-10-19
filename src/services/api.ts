import axios from 'axios';

const API_BASE_URL = 'https://api.englishpro.com/v1'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/register', { username, email, password });
};

export const getArticles = () => {
  return api.get('/articles');
};

export const getListeningExercises = () => {
  return api.get('/listening-exercises');
};

export const getVocabulary = () => {
  return api.get('/vocabulary');
};

export const updateProgress = (module: string, progress: number) => {
  return api.post('/progress', { module, progress });
};

export default api;