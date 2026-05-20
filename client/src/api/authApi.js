import API from "./axios";

export const signupUser = (data) =>
  API.post("/auth/signup", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getCurrentUser = () =>
  API.get("/auth/me");