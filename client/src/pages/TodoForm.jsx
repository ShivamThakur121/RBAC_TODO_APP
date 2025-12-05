import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";

const TodoForm = () => {
  const { id } = useParams(); // "new" or existing id
  const navigate = useNavigate();
  const isEdit = id !== "new";
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Non-Urgent",
    completed: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api.get("/todos").then((res) => {
        const todo = res.data.find((t) => t._id === id);
        if (todo) {
          setForm({
            title: todo.title,
            description: todo.description || "",
            dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : "",
            category: todo.category,
            completed: todo.completed,
          });
        }
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await api.put(`/todos/${id}`, form);
      } else {
        await api.post("/todos", form);
      }
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Error saving todo"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {isEdit ? "Edit Todo" : "New Todo"}
      </h2>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          <label className="block mb-1 text-sm font-medium text-white">
            Title
          </label>
          <Input 
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex mb-4">
          <div className="flex flex-col w-full m-1">
            <label className="block mb-1 text-sm font-medium text-white">
                Due Date
            </label>
            <Input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-full m-1">
            <label className="block mb-1 text-sm font-medium text-white">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="Urgent">Urgent</option>
              <option value="Non-Urgent">Non-Urgent</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 mb-4 text-sm text-white">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Mark as completed
        </label>
        <Button className="w-full">
          {isEdit ? "Save Changes" : "Create Todo"}
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
