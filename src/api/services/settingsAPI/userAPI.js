import apiClient from '../../config/axios';

export const getUserList = (payload) => {
  return apiClient.post('api/UserListView', payload);
};

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`api/User/GetById${userId}`);
    console.log("User data response:", response?.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};