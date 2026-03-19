import API from "./api";

// register
const registerUser = (data) => {
  return API.post("/api/v1/user/register", data);
};

// login
const loginUser = (data) => {
  return API.post("/api/v1/user/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
