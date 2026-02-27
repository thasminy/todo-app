"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category: string;
}

interface TodosContextType {
  todos: Todo[];
  addTodo: (
    title: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    category: string
  ) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string, updated: Partial<Todo>) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function useTodosContext() {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodosContext must be used within TodosProvider");
  return context;
}

export function TodosProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage directly
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("todos") : null;
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  const addTodo = (
    title: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    category: string
  ) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      startDate,
      startTime,
      endDate,
      endTime,
      category,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id: string, updated: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      )
    );
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, deleteTodo, toggleComplete, editTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
