import apiClient from '../../config/axios';

export const getUserList = (payload) => {
  return apiClient.post('api/UserListView', payload);
};

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`api/User/GetById${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export const updateUser = (id, payload) => {
  try {
      return apiClient.put(`/api/User/Edit${id}`, payload);
  } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
  }
};