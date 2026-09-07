import React, { useState, useEffect } from "react";
import {
  Plus,
  Check,
  Trash2,
  Calendar,
  Tag,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("app_todos");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            text: "Design beautiful UI",
            category: "Work",
            completed: true,
          },
          {
            id: 2,
            text: "Deploy application to AWS Amplify",
            category: "DevOps",
            completed: false,
          },
        ];
  });
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("app_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, category, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome to Task Management System!
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Organize your daily priorities effortlessly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={addTodo}
          className="p-6 space-y-4 border-b border-slate-800"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-1 shrink-0"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>
          <div className="flex gap-2 items-center text-xs text-slate-400">
            <Tag className="w-3.5 h-3.5" />
            {["Work", "Personal", "DevOps"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition ${
                  category === cat
                    ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/50"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </form>

        {/* Filter Bar */}
        <div className="flex border-b border-slate-800 text-sm">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-3 capitalize font-medium transition border-b-2 ${
                filter === f
                  ? "border-indigo-500 text-indigo-400 bg-slate-800/30"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <ul className="divide-y divide-slate-800/50 max-h-80 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <li className="p-8 text-center text-slate-500 text-sm">
              No tasks found
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition group"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer overflow-hidden"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 shrink-0 group-hover:text-indigo-400" />
                  )}
                  <span
                    className={`text-sm truncate ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    {todo.category}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
