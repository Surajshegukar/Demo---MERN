
import instance from "../utils/axiosInstance";

export const deleteItem = (model, id) =>{
  return instance.delete(`/api/delete/${model}/${id}`);
}

export const activateItem = (model, id) =>{
  return instance.put(`/api/active/${model}/${id}`);
}

export const deactivateItem = (model, id) =>{
  return instance.put(`/api/inactive/${model}/${id}`);
}