import apiClient from "../../config/axios";

export const getUserRoleType = () => apiClient.get("api/UserRoleType");

export const getInsertionMode = () => apiClient.get("api/InsertionMode");

export const getUserRole = () => apiClient.get("/api/UserRole");

// export const getCopyRoleTemplate = (id) => apiClient.get(`api/UserRole/getCopyRoleTemplate/${id}`);
export const getCopyRoleTemplate = (payload) => {
  return apiClient.post("/api/UserRole/GetChildRoleByParentRoleId", payload);
};

export const getOrganization = () => apiClient.get("api/Organization");
