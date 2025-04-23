import apiClient from "../config/axios";

export const getUsers = async () => {
    try {
      const response = await apiClient.get('api/Cuntry');
      console.log('Users fetched:', response?.data);
      return response?.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Optional: bubble up for handling in component
    }
  };

export const getUser = () => apiClient.get('api/Cuntry');