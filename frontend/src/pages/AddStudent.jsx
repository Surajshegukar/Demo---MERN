import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../utils/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();

  const schema = Yup.object({
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(100, "First name cannot exceed 100 characters")
      .required("First name is required"),

    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(100, "Last name cannot exceed 100 characters")
      .required("Last name is required"),

    dob: Yup.date().required("Date of birth is required"),

    profile: Yup.mixed()
      .nullable()
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value || value.length === 0) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(
          value[0]?.type
        );
      }),
    email: Yup.string()
      .email("Enter a valid email address")
      .max(150, "Email cannot exceed 150 characters")
      .required("Email is required"),

    mobile_no: Yup.string()
      .matches(/^\+?[0-9\s\-]{7,15}$/, "Enter a valid mobile number")
      .required("Mobile number is required"),

    address: Yup.string().required("Address is required"),
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
        ? `http://localhost:3000/api/students/${id}`
        : `http://localhost:3000/api/students`;

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
            `http://localhost:3000/api/students/${id}`
          );
          const student = res.data.data;
          setImagePreview(`http://localhost:3000/uploads/${student.profile}`);

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
