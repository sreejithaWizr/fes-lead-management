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
    return response?.data;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      // Return the error response data as if it were a success
      return error.response?.data;
    }
    console.error('Login error:', error);
    throw error; // Let caller function handle error
  }
};

// OTP Generation
export const generateOtp = async (email) => {
  try {
    const response = await apiClient.post('api/User/ForgotPasswordGenerateOTP', {
      email,
    });
    return response?.data;
  } catch (error) {
    throw error; // Let caller handle error
  }
};

// Password Reset
export const getResetPassword = async (email, newPassword, verificationCode) => {
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