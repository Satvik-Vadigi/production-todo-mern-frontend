import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const registerUser = (data) => {
  return axios.post(`${baseUrl}/api/v1/user/register`, data);
};

const loginUser = (data) => {
  return axios.post(`${baseUrl}/api/v1/user/login`, data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
