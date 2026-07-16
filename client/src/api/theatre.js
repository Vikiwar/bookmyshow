import { axiosInstance } from "./index";

export const addTheatre = async (theatreData) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      theatreData,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllTheatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllTheatresForOwner = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theatres/get-theatre-by-owner/${ownerId}`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateTheatre = async (theatreData) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatres/update-theatre",
      theatreData,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theatres/delete-theatre/${theatreId}`,
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
