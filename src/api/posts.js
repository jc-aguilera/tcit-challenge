export const posts = {
  insertPost: (api) => ({ name, description }) =>
    api.post(`posts/`, { name, description }),
  removePost: (api) => (id) => api.delete(`posts/${id}`),
  listPosts: (api) => () => api.get(`posts/`),
};

export default posts;
