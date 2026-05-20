import {
  useContext,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  loginUser,
  getCurrentUser,
} from "../api/authApi";

import {
  AuthContext,
} from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const {
    setUser,
    setToken,
  } = useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response =
        await loginUser(formData);

      const token =
        response.data.token;

      setToken(token);

      const userResponse =
        await getCurrentUser();

      setUser(userResponse.data);

      alert("Login successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-lg py-3 font-semibold"
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;