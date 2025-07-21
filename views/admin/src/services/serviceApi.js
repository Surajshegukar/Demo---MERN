// api/serviceApi.js
import instance from "../utils/axiosInstance";

export const getServiceById = (id) =>
  instance.get(`/api/services/get-service/${id}`);

export const submitServiceForm = (id, formData, method) =>
  instance({
    method,
    url: id
      ? `/api/services/add-service/${id}`
      : `/api/services/add-service`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });