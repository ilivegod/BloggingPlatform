import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import BlogsPage from "./pages/blog/BlogsPage";
import RootLayout from "./components/layout/RootLayout";
import NotFound from "./pages/NotFound";
import BlogDetailPage from "./pages/blog/BlogDetailPage";
import BlogCreationPage from "./pages/blog/BlogCreation";
import Account from "./pages/profilePage";
import ProfileLander from "./pages/profileLander";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Make sure it exists in your HTML file."
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="BlogDetailPage/:blogId" element={<BlogDetailPage />} />
          <Route path="profilePage/:userId" element={<Account />} />
          <Route path="createBlog" element={<BlogCreationPage />} />
          <Route path="profileLander" element={<ProfileLander />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* 
      <Route path="blogCreation" element={<BlogCreationPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
