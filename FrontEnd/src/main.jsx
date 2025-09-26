import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import EventForm from "./pages/EventForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<EventForm />} />
          <Route path="/add/:id" element={<EventForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
