"use client";

import { useState, useMemo } from "react";
import { useTodosContext } from "../../hooks/TodosContext";
import TodoList from "../../component/TodoList";
import Filters from "../../component/Filters";

const categories = ["all", "work", "personal", "urgent"];

export default function TodosPage() {
  const { todos, deleteTodo, toggleComplete, addTodo } = useTodosContext();

  // Local filter states
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("asc");
  const [perPage, setPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ===============================
  // 🔹 Filtered & Sorted Todos
  // ===============================
  const filtered = useMemo(() => {
    return todos
      .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
      .filter(t =>
        filter === "all"
          ? true
          : filter === "completed"
          ? t.completed
          : !t.completed
      )
      .filter(t =>
        activeTab === "all" ? true : t.category.toLowerCase() === activeTab.toLowerCase()
      )
      .sort((a, b) =>
        sort === "asc"
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
  }, [todos, search, filter, activeTab, sort]);

  // ===============================
  // 🔹 Pagination
  // ===============================
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage, perPage]);

  // ===============================
  // 🔹 Handlers that reset page
  // ===============================
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* 🔹 Filters */}
      <Filters
        search={search}
        setSearch={handleSearchChange}
        filter={filter}
        setFilter={handleFilterChange}
        sort={sort}
        setSort={setSort}
        perPage={perPage}
        setPerPage={handlePerPageChange}
      />

      {/* 🔹 Category Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleTabClick(cat)}
            style={{
              background: activeTab === cat ? "#1976d2" : "#e0e0e0",
              color: activeTab === cat ? "#fff" : "#232526",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔹 Todo List */}
      <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "8px" }}>
        <TodoList
          todos={paginated}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          addTodo={addTodo}
        />
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "0.95rem",
              color: "#232526",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{
                background: "#e0e0e0",
                border: "none",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "0.95rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Prev
            </button>
            <span>{` Page ${currentPage} of ${totalPages} `}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{
                background: "#e0e0e0",
                border: "none",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "0.95rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
