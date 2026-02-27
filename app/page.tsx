"use client";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2 0%, #232526 100%)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        margin: "32px",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "18px" }}>
        📝 Welcome to Your To-Do Dashboard
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "32px", textAlign: "center", maxWidth: "500px" }}>
        Organize your tasks, track your progress, and stay productive! Use the side menu to add new tasks, view your to-do list, and manage your work, personal, and urgent items.
      </p>
      <div style={{
        display: "flex",
        gap: "24px",
        marginTop: "16px"
      }}>
        <div style={{
          background: "#fff",
          color: "#232526",
          borderRadius: "12px",
          padding: "24px 32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: "180px",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: "8px" }}>Work</h2>
          <span>Manage your work tasks efficiently.</span>
        </div>
        <div style={{
          background: "#fff",
          color: "#232526",
          borderRadius: "12px",
          padding: "24px 32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: "180px",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: "8px" }}>Personal</h2>
          <span>Keep track of your personal goals.</span>
        </div>
        <div style={{
          background: "#fff",
          color: "#232526",
          borderRadius: "12px",
          padding: "24px 32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: "180px",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: "8px" }}>Urgent</h2>
          <span>Don’t miss important deadlines!</span>
        </div>
      </div>
    </div>
  );
}
