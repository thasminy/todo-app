"use client";

import { Todo } from "../hooks/TodosContext";
import TodoItem from "./TodoItem";
import * as XLSX from "xlsx";
import { ChangeEvent } from "react";

interface Props {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  addTodo: (
    title: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    category: string
  ) => void;
}

export default function TodoList({
  todos,
  deleteTodo,
  toggleComplete,
  addTodo,
}: Props) {

  // ===============================
  // 📥 IMPORT CSV / EXCEL
  // ===============================
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      interface ImportRow {
        title: string;
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
        category: string;
      }

      const jsonData = XLSX.utils.sheet_to_json<ImportRow>(sheet);

      jsonData.forEach((row) => {
        addTodo(
          row.title || "",
          row.startDate || "",
          row.startTime || "",
          row.endDate || "",
          row.endTime || "",
          row.category || "personal"
        );
      });
    };

    reader.readAsBinaryString(file);
  };

  // ===============================
  // 📤 EXPORT TO EXCEL
  // ===============================
  const handleExport = () => {
    const stored = localStorage.getItem("todos");

    const allTodos: Todo[] = stored ? JSON.parse(stored) : [];

    const exportData = allTodos.map((todo) => ({
      Title: todo.title,
      StartDate: todo.startDate,
      StartTime: todo.startTime,
      EndDate: todo.endDate,
      EndTime: todo.endTime,
      Category: todo.category,
      Completed: todo.completed ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");

    XLSX.writeFile(workbook, "Todo_Report.xlsx");
  };

  return (
    <div>
      {/* 🔥 Import & Export Buttons */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
        <label
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Import CSV/Excel
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleImport}
            hidden
          />
        </label>

        <button
          onClick={handleExport}
          style={{
            padding: "8px 12px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Export as Excel
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            margin: "32px 0",
            fontSize: "1.1rem",
          }}
        >
          No tasks found.
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))
      )}
    </div>
  );
}
