"use client";
import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  category: string;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");

    if (stored) {
      setTimeout(() => {
        try {
          setTodos(JSON.parse(stored));
        } catch (e) {
          console.log("Invalid JSON", e);
        }
      }, 0);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, dueDate: string, category: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      dueDate,
      category,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id: string, title: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, title } : t
      )
    );
  };

  const filteredTodos = todos
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? t.completed
        : !t.completed
    )
    .sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() -
          new Date(a.dueDate).getTime()
    );

  const totalPages = Math.ceil(filteredTodos.length / perPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return {
    todos: paginatedTodos,
    addTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    totalPages,
  };
}
