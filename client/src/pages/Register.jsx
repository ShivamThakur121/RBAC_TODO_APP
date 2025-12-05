import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {

  const {user, login, setLoading } = useAuth();
  
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


  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md shadow-md rounded-lg p-6 backdrop-blur-[3px] border-white border-[1px]">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">Register</h2>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Email
            </label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Username
            </label>
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Password
            </label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          </div>
          <Button className="w-full mt-2">Create Account</Button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Already registered?{" "}
          <Link className="text-blue-600 text-sm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
