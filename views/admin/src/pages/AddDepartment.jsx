import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, Link } from "react-router-dom";

import Alert from "../components/Alert";

import { getDepartmentById, submitDepartmentForm } from "../services/serviceApi";
import { departmentSchema } from "../validations/validationSchema";

export default function AddDepartment() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(departmentSchema),
  });

  const resetForm = () => {
    reset({
      department_name: "",
    });
setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("department_name", data.department_name);
      
      const method = id ? "put" : "post";
      const response = await submitDepartmentForm(id, formData, method);
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
      getDepartmentById(id)
        .then((res) => {
          const data = res.data.data;
          reset({
            department_name: data.department_name,
          });
        })
        .catch(() => setMessage("Error fetching department data"));
    }
  }, [id, reset]);

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>{id ? "Edit Department" : "Add Department"}</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && <Alert message={message} />}

          <form
            onSubmit={handleSubmit(onSubmit)}
            name="add_department_form"
            id="add_department_form"
            encType="multipart/form-data"
          >
            <div className="row flex_wrap">
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Department Name <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("department_name")}
                  placeholder="Enter Department Name"
                  autoComplete="off"
                />
                {errors.department_name && (
                  <p className="error">{errors.department_name.message}</p>
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
