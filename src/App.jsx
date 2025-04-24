
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResetPasswordPage from './pages/ResetPasswordPage';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
import LeadsPage from "./pages/LeadsListPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import LeadDetailsViewPage from "./pages/LeadDetailsViewPage";
import NotFound from "./pages/NotFound";
import EditLeadPage from "./pages/EditLeadPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
           <Route path="reset-password" element={<ResetPasswordPage />} />
           <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/leads" replace />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/create" element={<CreateLeadPage />} />
            <Route path="leads/detailsview" element={<LeadDetailsViewPage />} />
            <Route path="leads/edit" element={<EditLeadPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
