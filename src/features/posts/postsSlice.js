import { createSlice } from "@reduxjs/toolkit";
import { insertPost, removePost, listPosts } from '../../api';

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
    deletePost: (state, actions) => {
      state.postList = state.postList.filter((post) => post.id !== actions.payload)
    },
  },
})

// eslint-disable-next-line no-unused-vars
const { setPosts, addPost, deletePost } = postsSlice.actions;

export const getPosts = () => (dispatch) => {
  listPosts().then((response) => {
    dispatch(setPosts(response.data));
  });
};

export const destroyPost = (postId) => (dispatch) => {
  removePost(postId).then(() => {
    dispatch(deletePost(postId));
  })
}
export const createPost = (postData) => (dispatch) => {
  const { name, description } = postData;
  insertPost({ name, description}).then((response) => {
    dispatch(setPosts(response.data));
  });
};

export default postsSlice.reducer;
