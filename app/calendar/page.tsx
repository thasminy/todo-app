"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { useTodosContext } from "@/hooks/TodosContext";

// Prevent SSR hydration issues
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

type Task = {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export default function CalendarPage() {
  const { todos } = useTodosContext();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const categoryColors: Record<string, string> = {
    Work: "#1976d2",
    Personal: "#4caf50",
    Urgent: "#ff5252",
  };

  // Fix timezone issue (Malaysia UTC+8 safe)
  const formatDate = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

  // Format for display (remove ISO format)
  const formatDisplayDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Support DATE RANGE
  const tasksForDate = (date: Date) => {
    const formatted = formatDate(date);

    return todos.filter(
      (todo) =>
        formatted >= todo.startDate &&
        formatted <= todo.endDate
    );
  };

  // Render tasks inside calendar tiles
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const tasks = tasksForDate(date);

    return (
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              fontSize: "0.7rem",
              marginTop: "2px",
              padding: "2px 4px",
              borderRadius: "4px",
              color: "#fff",
              background: categoryColors[task.category] || "#888",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTask(task);
            }}
          >
            {task.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "40px",
        }}
      >
        Calendar View
      </h2>

      <div style={{ margin: "0 auto", maxWidth: "1000px" }}>
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) setSelectedDate(value);
          }}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>

      {/* Modal */}
      {selectedTask && (
        <div
          onClick={() => setSelectedTask(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "420px",
              maxWidth: "95%",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              animation: "scaleIn 0.2s ease-in-out",
            }}
          >
            {/* Top Color Header */}
            <div
              style={{
                height: "8px",
                background:
                  categoryColors[selectedTask.category] || "#888",
              }}
            />

            <div style={{ padding: "24px" }}>
              {/* Title */}
              <h2
                style={{
                  margin: 0,
                  marginBottom: "12px",
                  fontSize: "22px",
                  fontWeight: 600,
                }}
              >
                {selectedTask.title}
              </h2>

              {/* Category Badge */}
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  fontSize: "12px",
                  borderRadius: "50px",
                  background:
                    categoryColors[selectedTask.category] + "20",
                  color:
                    categoryColors[selectedTask.category] || "#555",
                  fontWeight: 500,
                  marginBottom: "18px",
                }}
              >
                {selectedTask.category}
              </span>

              {/* Date Section */}
              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#f5f7fa",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#666",
                    marginBottom: "4px",
                  }}
                >
                  Date
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {selectedTask.startDate === selectedTask.endDate
                    ? formatDisplayDate(selectedTask.startDate)
                    : `${formatDisplayDate(
                        selectedTask.startDate
                      )} - ${formatDisplayDate(
                        selectedTask.endDate
                      )}`}
                </p>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    router.push(`/edit/${selectedTask.id}`)
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "none",
                    background:
                      categoryColors[selectedTask.category] ||
                      "#4caf50",
                    color: "#fff",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => setSelectedTask(null)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
