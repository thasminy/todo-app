"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/add", label: "Add To-Do", icon: "➕" },
  { href: "/todos", label: "Todo List", icon: "📝" },
  { href: "/calendar", label: "Calendar View", icon: "📅" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div style={{
      width: "220px",
      background: "#232526",
      color: "#fff",
      height: "100vh",
      padding: "24px 0",
      position: "fixed",
      left: 0,
      top: 0,
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    }}>
      <h2 style={{ textAlign: "center" }}>Menu</h2>
      {menuItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            padding: "12px 24px",
            color: pathname === item.href ? "#ff5252" : "#fff",
            textDecoration: "none",
            fontWeight: pathname === item.href ? 700 : 400,
            background: "none",
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseOver={e => { e.currentTarget.style.color = "#ff5252"; }}
          onMouseOut={e => { e.currentTarget.style.color = pathname === item.href ? "#ff5252" : "#fff"; }}
        >
          <span style={{ fontSize: "1.2em" }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
