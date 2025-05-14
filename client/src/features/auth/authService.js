import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "auth/";

const registerService = async (userData) => {
  const response = await axios.post(URL + "register", userData);

  const id = response.data.id;
  const token = response.data.token;

  Cookies.set("id", id, { expires: 7 });
  Cookies.set("token", token, { expires: 7 });

  return response.data;
};

const loginService = async (userData) => {
  const response = await axios.post(URL + "login", userData);

  const id = response.data.id;
  const token = response.data.token;

  Cookies.set("id", id, { expires: 7 });
  Cookies.set("token", token, { expires: 7 });

  return response.data;
};

const logoutService = async () => {
  Cookies.remove("id", { path: "" });
  Cookies.remove("token", { path: "" });
  return;
};

const resetPasswordService = async (userData) => {
  const response = await axios.post(URL + "reset", userData);

  return response.data;
};

const confirmResetPasswordService = async (userData) => {
  const response = await axios.post(URL + "reset/" + userData.token, userData);

  return response.data;
};

export {
  registerService,
  loginService,
  logoutService,
  resetPasswordService,
  confirmResetPasswordService,
};
