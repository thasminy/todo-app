import { ReactNode } from "react";
import Sidebar from "../component/Sidebar";
import { TodosProvider } from "../hooks/TodosContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body style={{
        display: "flex",
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
      }}>
        <Sidebar />
        <TodosProvider>
          <div style={{
            marginLeft: "220px",
            width: "100%",
            height: "100vh",
            padding: "32px",
            overflow: "auto",
          }}>
            {children}
          </div>
        </TodosProvider>
      </body>
    </html>
  );
}
