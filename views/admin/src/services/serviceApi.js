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


  export const getDepartmentById = (id) =>
  instance.get(`/api/departments/get-department/${id}`);

export const submitDepartmentForm = (id, formData, method) =>
  instance({
    method,
    url: id
      ? `/api/departments/add-department/${id}`
      : `/api/departments/add-department`,
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });


    export const getDesignationById = (id) =>
  instance.get(`/api/designations/get-designation/${id}`);

export const submitDesignationForm = (id, formData, method) =>
  instance({
    method,
    url: id
      ? `/api/designations/add-designation/${id}`
      : `/api/designations/add-designation`,
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });