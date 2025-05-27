import apiClient from "../../config/axios";

export const getRoleList = (payload) => {
  return apiClient.post("api/UserRoleListView", payload);
};

export const createRole = (payload) => {
  return apiClient.post("api/UserRole", payload);
};

export const roleAccess = (payload) => {
  return apiClient.post("/api/Modules/GetModuleFeatureByOrgId", payload);
};
