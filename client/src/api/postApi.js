import API from "./axios";

export const getAllPosts = (
  sort = "latest"
) =>
  API.get(
    `/posts?sort=${sort}`
  );

export const getSinglePost = (id) =>
  API.get(`/posts/${id}`);

export const getPostsByCommunity = (name) =>
  API.get(`/posts/community/${name}`);

export const createPost = (data) =>
  API.post("/posts", data);