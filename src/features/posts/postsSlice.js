import { createSlice } from "@reduxjs/toolkit";
import { listPosts } from '../../api';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    postList: [],
  },
  reducers: {
    setPosts: (state, actions) => {
      state.postList = actions.payload;
    },
    addPost: (state, actions) => {
      state.postList = [...state.postList, actions.payload];
    },
    removePost: (state, actions) => {
      state.postList = state.postList.filter((post) => post.id !== actions.payload)
    },
  },
})

export const { setPosts, addPost, removePost } = postsSlice.actions;

export const getPosts = () => (dispatch) => {
  new Promise(resolve => setTimeout(() => resolve({ data: [
    { id: 1, name: 'Post 1', description: 'Lorem ipsum dolor sit amet 1' },
    { id: 2, name: 'Post 2', description: 'Lorem ipsum dolor sit amet 2' },
    { id: 3, name: 'Post 3', description: 'Lorem ipsum dolor sit amet 3' },
  ]}), 1000)).then((response) => {
    dispatch(setPosts(response.data));
  });
};

export const deletePost = (postId) => (dispatch) => {
  dispatch(removePost(postId));
}

export const createPost = (postData) => (dispatch) => {
    new Promise(resolve => setTimeout(() => resolve({
      data: {
        id: 4,
        name: postData.name,
        description: postData.description,
      },
    }), 1000)).then((response) => {
      dispatch(addPost(response.data));
    });
  };

export default postsSlice.reducer;
