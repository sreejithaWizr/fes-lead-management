import apiClient from "../../config/axios";

export const getRoleList = (payload) => {
    return apiClient.post('api/UserRoleListView', payload);
  };