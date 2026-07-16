import { axiosInstance } from "./index";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/add-movie",
      movieData,
    );
    console.log(movieData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateMovie = async (movieData) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      movieData,
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteMovie = async (movieData) => {
  try {
    const response = await axiosInstance.put("/api/movies/delete-movie", {
      movieData,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/api/movies/movie/${movieId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
