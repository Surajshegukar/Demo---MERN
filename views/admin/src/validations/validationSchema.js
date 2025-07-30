import * as Yup from "yup";

 const serviceSchema = Yup.object({
  service_name: Yup.string()
    .min(2, "Service name must be at least 2 characters")
    .max(100, "Service name cannot exceed 100 characters")
    .required("Service name is required"),

  service_description: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name cannot exceed 100 characters")
    .required("Last name is required"),

  service_img: Yup.mixed()
    .nullable()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
});

const departmentSchema = Yup.object({
  department_name: Yup.string()
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name cannot exceed 100 characters")
    .required("Department name is required"),
});

const designationSchema = Yup.object({
  designation_name: Yup.string()
    .min(2, "Designation name must be at least 2 characters")
    .max(100, "Designation name cannot exceed 100 characters")
    .required("Designation name is required"),
});

export { designationSchema, departmentSchema, serviceSchema };
