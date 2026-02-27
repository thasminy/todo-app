"use client";

import { Todo } from "../hooks/TodosContext";
import Link from "next/link";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
}

export default function TodoItem({
  todo,
  deleteTodo,
  toggleComplete,
}: TodoItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f7f7f7",
        borderRadius: "8px",
        padding: "14px 18px",
        marginBottom: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        justifyContent: "space-between",
        transition: "box-shadow 0.2s, background 0.2s",
        border: "1px solid #ececec",
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = "#e3f2fd";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(25,118,210,0.08)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = "#f7f7f7";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          style={{ marginRight: "12px" }}
        />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#aaa" : "#232526",
            fontWeight: 500,
            fontSize: "1.05rem",
            flex: 1,
            marginRight: "16px",
          }}
        >
          {todo.title}
        </span>
        <span
          style={{
            marginLeft: "8px",
            fontSize: "0.95rem",
            color: "#1976d2",
            background: "#e3f2fd",
            borderRadius: "4px",
            padding: "2px 10px",
            fontWeight: 500,
            minWidth: "80px",
            textAlign: "center",
            marginRight: "20px",
          }}
        >
          {todo.category}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            fontSize: "0.95rem",
            color: "#888",
            marginRight: "10px",
            minWidth: "180px",
            textAlign: "right",
            background: "#fff",
            borderRadius: "4px",
            padding: "2px 8px",
            border: "1px solid #ececec",
          }}
        >
          {todo.startDate} {todo.startTime} &rarr; {todo.endDate} {todo.endTime}
        </span>
        <Link
          href={`/edit/${todo.id}`}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.95rem",
            marginRight: "8px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
            transition: "background 0.2s",
          }}
        >
          Edit
        </Link>
        <button
          onClick={() => deleteTodo(todo.id)}
          style={{
            background: "#ff5252",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 2px 8px rgba(255,82,82,0.08)",
            transition: "background 0.2s",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#d32f2f")}
          onMouseOut={e => (e.currentTarget.style.background = "#ff5252")}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
