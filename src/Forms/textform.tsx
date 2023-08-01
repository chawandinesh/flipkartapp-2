import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required("*Required").email("Must be valid email"),
  })
  .required();

const textform = () => {
  const { register } = useForm({ resolver: yupResolver(schema) });

  return <input {...register("email")} type="text" />;
};

export default textform;
