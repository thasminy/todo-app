"use client";

import { useState } from "react";
import { useTodosContext } from "../hooks/TodosContext";

export default function AddTodo() {
  const { addTodo } = useTodosContext();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("Work");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !startTime || !endDate || !endTime) return;
    addTodo(title, startDate, startTime, endDate, endTime, category);
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setCategory("Work");
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "650px", // Bigger card
          width: "100%",
          background: "linear-gradient(135deg, #e3e6ee 0%, #f9fafc 100%)",
          borderRadius: "22px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.12)",
          padding: "48px 36px", // More padding
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          border: "1px solid #e0e3e7",
        }}
      >
        <h2 style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.6rem",
          color: "#232526",
          marginBottom: "12px",
          letterSpacing: "0.5px",
        }}>
          <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>🆕</span>
          Add Task
        </h2>
        <input
          placeholder="Task Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #cfd8dc",
            fontSize: "1.1rem",
            background: "#fff",
            outline: "none",
            marginBottom: "6px",
          }}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
          marginBottom: "6px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "1rem", color: "#1976d2", fontWeight: 600 }}>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cfd8dc",
                fontSize: "1.1rem",
                background: "#fff",
                outline: "none",
              }}
            />
            <label style={{ fontSize: "1rem", color: "#1976d2", fontWeight: 600 }}>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cfd8dc",
                fontSize: "1.1rem",
                background: "#fff",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "1rem", color: "#ff5252", fontWeight: 600 }}>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cfd8dc",
                fontSize: "1.1rem",
                background: "#fff",
                outline: "none",
              }}
            />
            <label style={{ fontSize: "1rem", color: "#ff5252", fontWeight: 600 }}>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cfd8dc",
                fontSize: "1.1rem",
                background: "#fff",
                outline: "none",
              }}
            />
          </div>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #cfd8dc",
            fontSize: "1.1rem",
            background: "#fff",
            outline: "none",
            marginBottom: "6px",
          }}
        >
          <option>Work</option>
          <option>Personal</option>
          <option>Urgent</option>
        </select>
        <button
          type="submit"
          aria-label="Add Task"
          style={{
            background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "16px 0",
            fontWeight: 700,
            fontSize: "1.2rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(25,118,210,0.12)",
            transition: "background 0.2s, transform 0.2s",
            letterSpacing: "0.5px",
          }}
        >
          <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>✅</span>
          Add Task
        </button>
      </form>
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            padding: "32px 24px",
            minWidth: "320px",
            textAlign: "center",
            position: "relative",
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                color: "#888",
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🎉</div>
            <h3 style={{ marginBottom: "8px", color: "#1976d2" }}>Task Added!</h3>
            <p style={{ color: "#232526" }}>Your task was successfully saved to localStorage.</p>
          </div>
        </div>
      )}
    </div>
  );
}
