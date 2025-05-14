import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.REACT_APP_BASE_URL + "blogs/";

const getBlogService = async (id) => {
  const response = await axios.get(URL + id);

  return response.data;
};
const getBlogsService = async () => {
  const response = await axios.get(URL);

  return response.data;
};
const createBlogService = async (formData) => {
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
const updateBlogService = async (formData) => {
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
const deleteBlogService = async (id) => {
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
  getBlogService,
  getBlogsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
};
