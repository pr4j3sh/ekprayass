import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "courses/";

const getCourseService = async (id) => {
  const response = await axios.get(URL + id);

  return response.data;
};
const getCoursesService = async () => {
  const response = await axios.get(URL);

  return response.data;
};
const createCourseService = async (formData) => {
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
const updateCourseService = async (formData) => {
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
const deleteCourseService = async (id) => {
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
  getCourseService,
  getCoursesService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
};
