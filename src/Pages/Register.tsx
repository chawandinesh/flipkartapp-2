import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Config from "../Components/Config";



const schema = yup
  .object({
    name: yup
      .string()
      .required("*Required")
      .min(2, "Name must be at least 2 alphabets"),
    email: yup.string().required("*Required").email("Must be valid mail"),
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
    confirmpassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    role: yup.string().required("Please select the role"),
  })
  .required();

const Register = () => {
  const [data, setData] = useState({});

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let navigate = useNavigate();

  const onSubmit = async (values: any) => {
    
    // setData(values);

    try {
      const response = await axios({
        method: "Post",
        url: Config.apikeyusers,
        data: values,
      });
      alert("Registration completed successfully");
      console.log(response.data);
      navigate(`/Login`);
    } catch (err: any) {
      console.log("from axios:" + err);
      alert(err);
    }
  };

  return (
    <div className="registerpage">
      <div className="registerleftpart">
        <h3>Looks like you're new here! </h3>
        <p> Signup to get started...</p>
        <img
          className="logoimg"
          src="https://i.pinimg.com/originals/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.png"
        />
        <h3>flipkart</h3>
        <p>
          Ab har <span className="spanclass">wish</span> hoogi{" "}
          <span className="spanclass">poori</span>
        </p>
      </div>
      <div className="registerrightpart">
        <div>
          <h3>Register/Sign up</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <br />
            <input type="text" {...register("name")} className="inputel" />
            <br />
            <small className="validationerror">{errors.name?.message}</small>
            <br />
            <label>Email Adress:</label>
            <br />
            <input type="text" {...register("email")} className="inputel" />
            <br />
            <small className="validationerror">{errors.email?.message}</small>
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              {...register("password")}
              className="inputel"
            />
            <br />
            <small className="validationerror">
              {errors.password?.message}
            </small>
            <br />
            <label>Confirm Password:</label>
            <br />
            <input
              type="password"
              {...register("confirmpassword")}
              className="inputel"
            />
            <br />
            <small className="validationerror">
              {errors.confirmpassword?.message}
            </small>
            <br />
            Role:
            <br />
            <select
              className="inputel"
              {...register("role")}
              placeholder="Select role"
            >
              <option selected></option>
              <option value={"Admin"}>Admin</option>
              <option value={"User"}>User</option>
              <option value={"Customer"}>Customer</option>
            </select>
            <br />
            <small className="validationerror">{errors.role?.message}</small>
            <br />
            <input type="submit" className="submit" />
          </form>
          <a href="/login" className="anchortag1">
            already registered? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
