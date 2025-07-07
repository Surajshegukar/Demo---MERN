// api/serviceApi.js
import axios from "../utils/axiosInstance";

export const getServiceById = (id) =>
  axios.get(`/api/services/get-service/${id}`);

export const submitServiceForm = (id, formData, method) =>
  axios({
    method,
    url: id
      ? `/api/services/add-service/${id}`
      : `/api/services/add-service`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });