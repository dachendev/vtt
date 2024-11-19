import { createRoot } from "react-dom/client";
import { SessionProvider } from "./features/auth";
import { Router } from "./Router";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <Router />
  </SessionProvider>
);
