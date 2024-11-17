import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./features/auth";
import { Dashboard } from "./pages/Dashboard";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
