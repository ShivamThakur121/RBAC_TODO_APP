import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/Button";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [tab, setTab] = useState("users");

  const fetchData = async () => {
    const [u, t] = await Promise.all([
      api.get("/admin/users"),
      api.get("/admin/todos"),
    ]);
    setUsers(u.data);
    setTodos(t.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeRole = async (id, role) => {
    await api.patch(`/admin/users/${id}/role`, { role });
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-blue-50">Admin Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <Button
          className={tab === "users" ? "" : "bg-gray-200 text-green-600"}
          onClick={() => setTab("users")}
        >
          Users
        </Button>
        <Button
          className={tab === "todos" ? "" : "bg-gray-200 text-green-600"}
          onClick={() => setTab("todos")}
        >
          All Todos
        </Button>
      </div>

      {tab === "users" && (
        <div className="border rounded-lg p-4 shadow-sm backdrop-blur-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-lg text-white font-semibold">
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b last:border-0 text-white">
                  <td className="py-2">{u.username}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2 space-x-2">
                    <button
                      className="text-sm text-blue-600"
                      onClick={() => changeRole(u._id, "user")}
                    >
                      Make User
                    </button>
                    <button
                      className="text-sm text-purple-600"
                      onClick={() => changeRole(u._id, "admin")}
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "todos" && (
        <div className="border rounded-lg p-4 shadow-sm space-y-2 backdrop-blur-sm">
          {todos.map((t) => (
            <div
              key={t._id}
              className="flex justify-between border-b last:border-0 py-2 text-lg text-white"
            >
              <div>
                <p className="font-medium text-white">{t.title}</p>
                <p className="text-sm text-white">
                  Owner: {t.user?.username} ({t.user?.email}) | {t.category}
                </p>
              </div>
              <p className="text-xs">
                {t.completed ? "Completed" : "Pending"}
              </p>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-sm text-gray-500">No todos found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
