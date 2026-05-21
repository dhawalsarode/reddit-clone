import API from "./axios";

export const getAllCommunities =
  () => API.get("/communities");

export const getSingleCommunity =
  (name) =>
    API.get(
      `/communities/${name}`
    );

export const createCommunity =
  (data) =>
    API.post(
      "/communities",
      data
    );