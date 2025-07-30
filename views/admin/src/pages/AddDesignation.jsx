import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, Link } from "react-router-dom";

import Alert from "../components/Alert";

import {
  getDesignationById,
  submitDesignationForm,
} from "../services/serviceApi";
import { designationSchema } from "../validations/validationSchema";

export default function AddDesignation() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(designationSchema),
  });

  const resetForm = () => {
    reset({
      designation_name: "",
    });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("designation_name", data.designation_name);

      const method = id ? "put" : "post";
      const response = await submitDesignationForm(id, formData, method);
      const { success, message } = response.data;
      setMessage(success ? `Success: ${message}` : `Error: ${message}`);
      if (success) {
        resetForm();
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage(`Error: ${msg}`);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getDesignationById(id)
        .then((res) => {
          const data = res.data.data;
          reset({
            designation_name: data.designation_name,
          });
        })
        .catch(() => setMessage("Error fetching designation data"));
    }
  }, [id, reset]);

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>{id ? "Edit Designation" : "Add Designation"}</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && <Alert message={message} />}

          <form
            onSubmit={handleSubmit(onSubmit)}
            name="add_designation_form"
            id="add_designation_form"
            encType="multipart/form-data"
          >
            <div className="row flex_wrap">
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Designation Name <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("designation_name")}
                  placeholder="Enter Designation Name"
                  autoComplete="off"
                />
                {errors.designation_name && (
                  <p className="error">{errors.designation_name.message}</p>
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
