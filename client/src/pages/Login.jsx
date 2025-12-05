import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {

  const { user, login, setLoading } = useAuth();
    if (user) {
      return (
        <div className="text-center mt-10">
          <h1 className="text-red-500 font-bold">
            You are already logged in, redirecting...
          </h1>

          {setTimeout(() => {
            window.location.href = "/";
          }, 2000)}
        </div>
      );
    }


  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { identifier, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md shadow-md rounded-lg p-6 backdrop-blur-[4px] border-white border-[1px]">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">Login</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-white">
              Email or Username
            </label>
            <Input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-white">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="w-full mt-2">Login</Button>
        </form>
        <p className="text-xs text-white mt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-600 font-semibold" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
