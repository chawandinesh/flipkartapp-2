import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")

      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character (!@#$%^&*)"
      )
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const passwordformform = () => {
  const { register } = useForm({ resolver: yupResolver(schema) });

  return <input {...register("password")} type="password" />;
};

export default passwordformform;
