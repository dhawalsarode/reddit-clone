import API from "./axios";

export const createComment = (data) =>
  API.post("/comments", data);

export const getCommentsByPost = (postId) =>
  API.get(`/comments/${postId}`);