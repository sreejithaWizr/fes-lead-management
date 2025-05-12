import apiClient from '../../config/axios';

export const getUserList = (payload) => {
    return apiClient.post('api/UserListView', payload);
  };