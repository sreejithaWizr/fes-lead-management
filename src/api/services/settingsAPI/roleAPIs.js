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

export const getRolebyId = (roleID) => {
  return apiClient.get(`/api/UserRoleListView/GetUserRoleListViewById/${roleID}`);
};

export const updateRole = (roleID, payload) => {
  return apiClient.put(`api/UserRole/${roleID}`, payload);
};

export const deleteRole = (roleID) => {
  return apiClient.delete(`api/UserRole/${roleID}`);
};
