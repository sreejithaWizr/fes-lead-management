import axios from "axios";
import { setupInterceptors } from "./interceptors";

// Environment variables
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "https://6703-103-181-238-22.ngrok-free.app/"
// const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10);
const API_TIMEOUT = parseInt("30000")

/**
 * Validates essential environment variables
 * @throws Error if required environment variables are missing
 */

const validateEnvVars = () => {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not defined in environment variables"
    );
  }
};

//  Creates and configures an Axios instance

export const createApiClient = () => {
  // validateEnvVars();

  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

  setupInterceptors(apiClient);

  return apiClient;
};

const apiClient = createApiClient();
export default apiClient;
