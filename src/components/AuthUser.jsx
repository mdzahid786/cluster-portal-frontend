import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AuthUser() {
  const navigate = useNavigate();

  const saveToken = (token, user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
    setUser(user);
    navigate("/dashboard");
  };
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return JSON.parse(token);
  };
  const getUser = () => {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user);
  };
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const http = axios.create({
    baseURL: "http://localhost:8083/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });

  return {
    http,
    setToken: saveToken,
    token,
    user,
    getToken,
    getUser,
    logout,
  };
}
