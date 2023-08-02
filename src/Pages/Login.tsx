import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";
import { signinuserdetailsContex } from "../Components/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Config from "../Components/Config";

const schema = yup
  .object({
    email: yup.string().required("*Required").email("Must be valid email"),
    password: yup.string().required("*Required"),
  })
  .required();

const Login = () => {
  const [users, setusers] = useState([]);
  const [getdata, setgetdata] = useState<any>({});

  const { userdetails, setuserdetails } = useContext<any>(
    signinuserdetailsContex
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let navigate = useNavigate();

  const loginsuccessstate=(each:any)=>{
    console.log(each)
    
    localStorage.setItem("userid", each.id);
    localStorage.setItem("username", each.name);
    localStorage.setItem("role", each.role);
    {
      each.role === "Admin" ? navigate("/admin") : navigate("/");
    }
    setuserdetails({
      ...userdetails,
      isloggedin: true,
      user: { ...each },
    });
  }
 
  const onSubmit = async (values: any) => {
    const isEmailValid = users.some(
      (each: any) => each?.email === values?.email
    );

    if (!isEmailValid) {
      toast("Email is not valid");
      return; // Exit the function if email is not valid
    } else {
      users.find((each: any) => {
        if (
          each?.email === values?.email &&
          each?.password === values?.password
        ) {
          toast.success("Success", {
            position:"top-center",
            autoClose:2000,
          });
          
          setTimeout(() => loginsuccessstate(each), 2500);


          
        } else if (
          each?.email === values?.email &&
          each?.password !== values?.password
        ) {
          toast.error("Wrong password", {
            position:"top-center",
            autoClose:2000,
          });
        }
      });
    }
  };
 
  const getusers = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: Config.apikeyusers,
      });
      setusers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="logincontainer">
      <div className="logincard">
        <div className="loginleftpart">
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
        <div className="loginright">
          <h4>Login/Sign in</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            Email:
            <br />
            <input
              {...register("email")}
              className="logininputel"
              type="text"
              placeholder="Email"
            />
            <br />
            <small className="validationerror">{errors.email?.message}</small>
            <br />
            Password:
            <br />
            <input
              {...register("password")}
              className="logininputel"
              type="password"
              placeholder="Password"
            />
            <br />
            <small className="validationerror">
              {errors.password?.message}
            </small>
            <br />
            <input className="loginsubmit" type="submit"></input>
          </form>
          <a href="/register" className="anchortag1">
            New to flipkart? Register/Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
