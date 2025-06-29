import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../utils/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddService() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();

  const schema = Yup.object({
    service_name: Yup.string()
      .min(2, "Service name must be at least 2 characters")
      .max(100, "Service name cannot exceed 100 characters")
      .required("Service name is required"),

    service_description: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(100, "Last name cannot exceed 100 characters")
      .required("Last name is required"),

    dob: Yup.date().required("Date of birth is required"),

    service_img: Yup.mixed()
      .nullable()
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value || value.length === 0) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(
          value[0]?.type
        );
      }),

  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const formattedDate = new Date(data.dob).toISOString().split("T")[0];

      formData.append("service_name", data.service_name);
      formData.append("service_description", data.service_description);
      formData.append("dob", formattedDate);
      if (data.profile?.length) {
        formData.append("service_img", data.service_img[0]);
      }

      const url = id
        ? `http://localhost:3000/api/services/add-service/${id}`
        : `http://localhost:3000/api/services/add-service`;

      const method = id ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message } = response.data;
      setMessage(success ? `Success: ${message}` : `Error: ${message}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
      setTimeout(() => navigate('/service-list'), 3000);
      
      
    }
  };

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/services/get-service/${id}`
          );
          const data = res.data.data;

          setImagePreview(`http://localhost:3000/uploads/${data.service_img}`);

          reset({
            service_name: data.service_name,
            service_description: data.service_description,
          });
        } catch (err) {
          setMessage("Error fetching service data");
        }
      };
      fetchStudent();
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
            encType=""
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
                {errors.profile && (
                  <p className="error">{errors.profile.message}</p>
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
