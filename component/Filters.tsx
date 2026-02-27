"use client";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  perPage: number;
  setPerPage: (value: number) => void;
}

export default function Filters({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  perPage,
  setPerPage,
}: FiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "18px",
        alignItems: "center",
      }}
    >
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 2,
          minWidth: "120px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          flex: 1,
          minWidth: "100px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          flex: 1,
          minWidth: "120px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="asc">Due Date Asc</option>
        <option value="desc">Due Date Desc</option>
      </select>
      <select
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
        style={{
          flex: 1,
          minWidth: "70px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}
