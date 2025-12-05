import React from "react";
const TodoCard = ({ todo, onEdit, onDelete, isAdminView }) => (
  <div className="border rounded-lg p-4 shadow-sm flex justify-between gap-4 bg-transparent">
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-white text-lg">{todo.title}</h3>
        {todo.completed && (
          <span className="text-sm px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            Completed
          </span>
        )}
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{todo.category}</span>
      </div>
      {todo.description && (
        <p className="text-sm text-white mt-1 line-clamp-2">
          {todo.description}
        </p>
      )}
      {todo.dueDate && (
        <p className=" text-white text-sm mt-1">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </p>
      )}
      {isAdminView && todo.user && (
        <p className=" text-white text-sm mt-1">
          Owner: {todo.user.username} ({todo.user.email})
        </p>
      )}
    </div>

    <div className="flex flex-col gap-2">
      <button
        className="text-sm font-semibold text-blue-600 hover:underline"
        onClick={() => onEdit(todo)}
      >
        Edit
      </button>
      <button
        className="text-sm font-semibold text-red-600 hover:underline"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>
    </div>
  </div>
);

export default TodoCard;
