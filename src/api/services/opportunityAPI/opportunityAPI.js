// Opportunity
import apiClient from "../../config/axios";

// export const getOpportunityList = (id) => apiClient.get(`api/LeadOpportunity/by-lead-id/${id}`)

export const getOpportunityList = async (id) => {
    try {
      const response = await apiClient.get(`api/LeadOpportunity/ByLeadId/${id}`);
      console.log('opportuniity fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportuniity:', error);
      throw error; // Optional: bubble up for handling in component
    }
  };

  export const getOpportunityDataByID = async (id) => {
    try {
      const response = await apiClient.get(`api/LeadOpportunity/${id}`);
      console.log('opportuniity fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportuniity:', error);
      throw error; // Optional: bubble up for handling in component
    }
  };

  export const opportunityUpdate = async (id, payload) => {
    try {
      const response = await apiClient.put(`api/LeadOpportunity/${id}`, payload);
      console.log('opportuniity updated:', response);
      return response;
    } catch (error) {
      console.error('Error fetching opportuniity:', error);
      throw error; // Optional: bubble up for handling in component
    }
  };
  