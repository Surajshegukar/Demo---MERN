import * as Yup from "yup"; 
 
 export const studentSchema = Yup.object({
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