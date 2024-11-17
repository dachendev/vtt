import { createRoot } from "react-dom/client";
import { Router } from "./Router";
import "./main.css";
import { SessionProvider } from "./features/auth";

createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <Router />
  </SessionProvider>
);
