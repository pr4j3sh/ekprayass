import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "posters/";

const getPosterService = async (id) => {
  const response = await axios.get(URL + id);

  return response.data;
};

const getPostersService = async () => {
  const response = await axios.get(URL);

  return response.data;
};

const createPosterService = async (formData) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(URL, formData, config);

  return response.data;
};

const updatePosterService = async (formData) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(URL + formData.id, formData, config);

  return response.data;
};

const deletePosterService = async (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(URL + id, config);

  return response.data;
};

export {
  getPosterService,
  getPostersService,
  createPosterService,
  updatePosterService,
  deletePosterService,
};
