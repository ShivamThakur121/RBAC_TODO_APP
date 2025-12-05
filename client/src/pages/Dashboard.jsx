import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TodoCard from "../components/TodoCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    completed: "",
    category: "",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.completed) params.completed = filters.completed;
      if (filters.category) params.category = filters.category;
      if (filters.search) params.search = filters.search;
      const res = await api.get("/todos", { params });
      setTodos(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (todo) => {
    if (!window.confirm("Delete this todo?")) return;
    await api.delete(`/todos/${todo._id}`);
    fetchTodos();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border-l-indigo-700/10 backdrop-blur-[3px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">My Todos</h1>
        <Button onClick={() => navigate("/todo/new")}>New Todo</Button>
      </div>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
        <input
          placeholder="Search title..."
          className="border px-2 py-1 rounded"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />
        <select
          className="border px-2 py-1 rounded"
          value={filters.completed}
          onChange={(e) =>
            setFilters((f) => ({ ...f, completed: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          <option value="Urgent">Urgent</option>
          <option value="Non-Urgent">Non-Urgent</option>
        </select>
        <Button onClick={fetchTodos}>Apply</Button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            isAdminView={user.role === "admin" && !!todo.user}
            onEdit={(todo) => navigate(`/todo/${todo._id}`)}
            onDelete={handleDelete}
          /> 
        ))}
        {!loading && todos.length === 0 && (
          <p className="text-sm text-gray-500">No todos yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
