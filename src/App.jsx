
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
import LeadsPage from "./pages/LeadsListPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import NotFound from "./pages/NotFound";
import CreateLeadComponent from "./components/forms/leadCreation/index"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/leads" replace />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/create" element={<CreateLeadComponent />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
