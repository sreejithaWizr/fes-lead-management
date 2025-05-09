
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
import ProtectedRoute from "./utils/ProtectedRoute";
import SettingsPage from "./components/SettingsPage";
import CreateOrganisationPage from "./pages/settings/CreateOrganisationPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
           <Route path="reset-password" element={<ResetPasswordPage />} />
           <Route element={<ProtectedRoute />}>
           <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/leads" replace />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/create" element={<CreateLeadPage />} />
            <Route path="leads/detailsview/:id" element={<LeadDetailsViewPage />} />
            <Route path="leads/edit/:id" element={<EditLeadPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/organisation/create" element={<CreateOrganisationPage />} />
            <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
