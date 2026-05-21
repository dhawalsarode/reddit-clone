import API from "./axios";

export const votePost = async (
  postId,
  value
) => {

  return API.post("/votes", {
    postId,
    value,
  });
};