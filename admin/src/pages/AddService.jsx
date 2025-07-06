import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, Link } from "react-router-dom";

import Alert from "../components/Alert";
import serviceSchema from "../validations/serviceSchema";
import { getServiceById, submitServiceForm } from "../services/serviceApi";


export default function AddService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const backendUrl = import.meta.env.REACT_APP_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("service_name", data.service_name);
      formData.append("service_description", data.service_description);
      if (data.service_img?.length) {
        formData.append("service_img", data.service_img[0]);
      }

      const method = id ? "put" : "post";
      const response = await submitServiceForm(id, formData, method);

      const { success, message } = response.data;
      setMessage(success ? `Success: ${message}` : `Error: ${message}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
      setTimeout(() => navigate("/service-list"), 3000);
    }
  };

  useEffect(() => {
    if (id) {
      getServiceById(id)
        .then((res) => {
          const data = res.data.data;
          reset({
            service_name: data.service_name,
            service_description: data.service_description,
          });
          setImagePreview(`${backendUrl}/uploads/services/${data.service_img}`);
        })
        .catch(() => setMessage("Error fetching service data"));
    }
  }, [id, reset]);

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>{id ? "Edit Service" : "Add Service"}</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && <Alert message={message} />}

          <form
            onSubmit={handleSubmit(onSubmit)}
            name="add_student_form"
            id="add_student_form"
            encType="multipart/form-data"
          >
            <div className="row flex_wrap">
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Service Name <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("service_name")}
                  placeholder="Enter Service Name"
                  autoComplete="off"
                />
                {errors.service_name && (
                  <p className="error">{errors.service_name.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Service Description <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("service_description")}
                  placeholder="Enter Service Description"
                  autoComplete="off"
                />
                {errors.service_description && (
                  <p className="error">{errors.service_description.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Service Image
                  {imagePreview && (
                    <Link
                      to={imagePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview
                    </Link>
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("service_img")}
                  className="form-control"
                />
                {errors.service_img && (
                  <p className="error">{errors.service_img.message}</p>
                )}
              </div>
            </div>

            <div className="form-footer">
              <div className="form-group col-md-4 col-sm-6 col-xs-12">
                <button type="submit" disabled={isSubmitting}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
