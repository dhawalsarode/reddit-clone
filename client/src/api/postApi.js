import API from "./axios";

export const getAllPosts = () =>
  API.get("/posts");

export const getSinglePost = (id) =>
  API.get(`/posts/${id}`);

export const getPostsByCommunity = (name) =>
  API.get(`/posts/community/${name}`);