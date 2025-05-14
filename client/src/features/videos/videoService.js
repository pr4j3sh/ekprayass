import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "videos/";

const getVideoService = async (id) => {
  const response = await axios.get(URL + id);

  return response.data;
};
const getVideosService = async () => {
  const response = await axios.get(URL);

  return response.data;
};
const createVideoService = async (formData) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(URL, formData, config);

  return response.data;
};
const updateVideoService = async (formData) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(URL + formData.id, formData, config);

  return response.data;
};
const deleteVideoService = async (id) => {
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
  getVideoService,
  getVideosService,
  createVideoService,
  updateVideoService,
  deleteVideoService,
};
