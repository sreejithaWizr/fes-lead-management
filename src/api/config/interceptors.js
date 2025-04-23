/**
 * Sets up request and response interceptors for the Axios instance
 * @param {import('axios').AxiosInstance} apiClient - The Axios instance to configure
 */
export const setupInterceptors = (apiClient) => {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = ""
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      handleApiError(error);
      return Promise.reject(error);
    }
  );
};

/**
 * Handles API errors based on status codes
 * @param {import('axios').AxiosError} error - The Axios error object
 */
const handleApiError = (error) => {
  const { response, request, message } = error;

  if (response) {
    const status = response.status;
    const data = response.data || {};

    switch (status) {
      case 400:
        console.error('Bad Request:', data);
        break;
      case 401:
        console.warn('Unauthorized:', data);
        // toast.info('Session expired, please login again');
        // removeToken();
        // window.location.href = '/login';
        break;
      case 403:
        console.warn('Forbidden:', data);
        // toast.warn('You do not have permission to perform this action');
        break;
      case 404:
        console.error('Not Found:', data);
        break;
      case 409:
      case 422:
        // toast.warn(data?.detail || 'Validation error occurred');
        break;
      case 500:
        console.error('Internal Server Error:', data);
        // toast.error('An unexpected server error occurred');
        break;
      case 502:
        console.error('Bad Gateway:', data);
        // toast.error('Server is currently unavailable');
        break;
      default:
        console.error(`Unhandled error [${status}]:`, data);
        // toast.error('An unexpected error occurred');
    }
  } else if (request) {
    console.error('Network Error - No response received:', request);
    // toast.error('Unable to connect to the server');
  } else {
    console.error('Request setup error:', message);
    // toast.error('An error occurred while sending the request');
  }
};
