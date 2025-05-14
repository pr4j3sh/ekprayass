import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "users/";

const getUserService = async (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL + "profile/" + id, config);

  return response.data;
};

const getUsersLessService = async () => {
  const response = await axios.get(URL);

  return response.data;
};

const getUsersService = async () => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL, config);

  return response.data;
};

const updateUserService = async (userData) => {
  // console.log(userData);
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    URL + "profile/" + userData.id + "/update",
    userData,
    config
  );

  return response.data;
};
const deleteUserService = async (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(URL + "profile/" + id + "/delete", config);

  return response.data;
};

export {
  getUserService,
  getUsersService,
  getUsersLessService,
  updateUserService,
  deleteUserService,
};
