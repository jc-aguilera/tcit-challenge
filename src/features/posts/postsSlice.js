import { createSlice } from "@reduxjs/toolkit";
import { listPosts } from '../../api';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, actions) => {
      state.posts = actions.payload;
    },
    addPost: (state, actions) => {
      state.posts = [...state.posts, actions.payload];
    },
    removePost: (state, actions) => {
      state.posts = state.posts.filter((post) => post.id !== actions.payload.id)
    },
  },
})

export const { setPosts, addPost, removePost } = postsSlice.actions;

export const getPosts = () => (dispatch) => {
  listPosts().then((response) => {
    dispatch(setPosts(response.data));
  });
};
