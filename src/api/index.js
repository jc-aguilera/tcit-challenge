import axios from 'axios';
import posts from './posts';
import { BACKEND_URL } from '../config';

const api = axios.create({
  baseURL: BACKEND_URL,
});

const insertPost = posts.insertPost(api);
const removePost = posts.removePost(api);
const listPosts = posts.listPosts(api);

export const postsApi = { insertPost, removePost, listPosts };
