import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../utils/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { studentSchema } from "../validations/studentValidation";

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();

 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(studentSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const formattedDate = new Date(data.dob).toISOString().split("T")[0];

      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("dob", formattedDate);
      formData.append("email", data.email);
      formData.append("mobile_no", data.mobile_no);
      formData.append("address", data.address);
      if (data.profile?.length) {
        formData.append("profile", data.profile[0]);
      }

      const url = id
        ? `/api/students/${id}`
        : `/api/students`;

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
      setTimeout(() => navigate('/student-list'), 3000);
      
      
    }
  };

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await axios.get(
            `/api/students/${id}`
          );
          const student = res.data.data;
          setImagePreview(`/uploads/${student.profile}`);

          reset({
            first_name: student.first_name,
            last_name: student.last_name,
            dob: student.dob.split("T")[0],
            email: student.email,
            mobile_no: student.mobile_no,
            address: student.address,
          });
        } catch (err) {
          setMessage("Error fetching student data");
        }
      };
      fetchStudent();
    }
  }, [id, reset]);

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>{id ? "Edit Student" : "Add Student"}</h3>
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
                  First Name <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("first_name")}
                  placeholder="Enter First Name"
                  autoComplete="off"
                />
                {errors.first_name && (
                  <p className="error">{errors.first_name.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Last Name <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("last_name")}
                  placeholder="Enter Last Name"
                  autoComplete="off"
                />
                {errors.last_name && (
                  <p className="error">{errors.last_name.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Date of Birth <b className="require">*</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...register("dob")}
                />
                {errors.dob && <p className="error">{errors.dob.message}</p>}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Profile Image
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
                  {...register("profile")}
                  className="form-control"
                />
                {errors.profile && (
                  <p className="error">{errors.profile.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Email <b className="require">*</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Mobile No <b className="require">*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("mobile_no")}
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile_no && (
                  <p className="error">{errors.mobile_no.message}</p>
                )}
              </div>

              <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label>
                  Address <b className="require">*</b>
                </label>
                <textarea
                  className="form-control"
                  {...register("address")}
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <p className="error">{errors.address.message}</p>
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
