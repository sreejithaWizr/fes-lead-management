import apiClient from "../../config/axios";

// export const loginUser = async (email, password) => apiClient.post('api/User/login',{
//     email,
//     password,
//   });


  export const getLoginUser = async (email, password) => {
  try {
    const response = await apiClient.post('api/User/login', {
      email,
      password,
    });
    console.log('Login response:', response?.data);
    return response?.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Let caller function handle error
  }
};