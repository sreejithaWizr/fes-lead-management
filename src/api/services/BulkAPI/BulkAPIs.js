import apiClient from '../../config/axios';

// This function fetches a bulk Checkbox data from backend.
export const getBulkCheckBoxData = async () => {
    try {
        const response = await apiClient.get('api/LeadImportFieldMaster');
        return response.data;
    } catch (error) {
        console.error("Error fetching Bulk API:", error);
        throw error;
    }
};

export const uploadBulkLeadData = async (file, checkboxValues) => {
  // Validate inputs
  if (!file || !(file instanceof File)) {
    throw new Error("No valid file provided for upload");
  }
  if (!Array.isArray(checkboxValues) || checkboxValues.length === 0) {
    throw new Error("Checkbox values are missing or invalid");
  }
  // Prepare FormData
  const formData = new FormData();
  formData.append("files", file);
  formData.append("fieldMasterJson", JSON.stringify(checkboxValues));

  try {
    const response = await apiClient.post(
      "api/LeadListView/upload-multiple",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to upload bulk lead data";
    throw new Error(errorMessage);
  }
};

/**
 * Fetches the status of the bulk upload job using the job ID.
 * @param {string} jobId - The ID of the job to be checked.
 */
export const getBulkUploadStatus = async (jobId) => {
  if (!jobId) {
    throw new Error("Job ID is required to fetch status");
  }

  try {
    const response = await apiClient.get(`api/Notification/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job status:", error);
    throw error;
  }
};