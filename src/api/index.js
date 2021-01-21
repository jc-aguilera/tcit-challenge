import axios from 'axios';
import { BACKEND_URL } from '../config';

const api = axios.create({
  baseURL: BACKEND_URL,
});

export const insertPost = ({ name, description }) => api.post(`posts/`, { name, description });
export const removePost = ({ id }) => api.delete(`posts/${id}`);
export const listPosts = () => api.get(`posts/`);

