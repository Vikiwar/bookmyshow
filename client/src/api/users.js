import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const res = await axiosInstance.post("api/users/register", value);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const LoginUser = async (value) => {
  try {
    const res = await axiosInstance.post("api/users/login", value);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("api/users/get-current-user");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "api/users/forgetpassword",
      value,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ResetPassword = async (value, id) => {
  try {
    const response = await axiosInstance.patch(`api/users/reset/${id}`, value);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
