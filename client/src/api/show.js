import { axiosInstance } from ".";

export const addShow = async (showData) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", showData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateShow = async (showData) => {
  try {
    const response = await axiosInstance.put(
      "/api/shows/update-show",
      showData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteShow = async (showData) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/delete-show",
      showData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getShowsByTheatre = async (theatreData) => {
  try {
    console.log(theatreData);
    const response = await axiosInstance.post(
      "/api/shows/get-all-shows-by-theatre",
      theatreData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-theatres-by-movie",
      payload,
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/shows/get-show-by-id/${payload.showId}`,
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
