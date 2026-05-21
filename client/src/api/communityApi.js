import API from "./axios";

export const getAllCommunities = () =>
  API.get("/communities");