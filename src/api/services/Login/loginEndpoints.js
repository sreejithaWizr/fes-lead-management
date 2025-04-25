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

// OTP Generation
export const generateOtp = async (email) => {
  try {
    const response = await apiClient.post('api/User/PasswordResetVerification', {
      email,
    });
    return response?.data;
  } catch (error) {
    throw error; // Let caller handle error
  }
};

// Password Reset
export const resetPassword = async (email, newPassword, verificationCode) => {
  try {
    const response = await apiClient.post('api/User/ResetPassword', {
      email,
      newPassword,
      verificationCode,
    });
    return response?.data;
  } catch (error) {
    throw error; // Let caller handle error
  }
};