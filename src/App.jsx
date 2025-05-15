
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResetPasswordPage from './pages/ResetPasswordPage';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
