import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "../Components/Footer";
import Config from "../Components/Config";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from 'firebase/app';
import   'firebase/storage';


const schema = yup.object({
  name: yup
    .string()
    .required("*Required")
    .min(2, "Name must be at least 2 alphabets"),
  email: yup.string().required("*Required").email("Must be valid mail"),
  role: yup.string().required("Please select the role"),
  gender: yup.string().required("Gender Required"),
  phonenumber: yup
    .number()
    .required("*Required")
    .min(10, "Phone number should be at least 10 digits"),
  city: yup.string().required("*Required"),
  state: yup.string().required("*Required"),
  country: yup.string().required("*Required"),
  PinCode: yup.number().required(),
});

const Profilepage = () => {
  const userId = localStorage.getItem("userid");

  const [editMode, setEditMode] = useState(false);

  const [userDetails, setUserdetails] = useState<any>({});

  const [imageURL, setImageURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const getUsers = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: Config.apikeyusers,
      });

      const users = response.data;

      const currentuserid = localStorage.getItem("userid");
      const getcurrentuser = users.find(
        (item: any) => item.id == currentuserid
      );
      setUserdetails(getcurrentuser);
    } catch (error) {
      console.log("axios err", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [editMode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const patchdata = async (data: any) => {
    try {
      const resp = await axios({
        method: "PATCH",
        url: `${Config.apikeyusers}/${userId}`,
        data: data,
      });
      setUserdetails({ ...userDetails, imgurl: data.imgurl });

      console.log(resp.data);
    } catch (err) {
      console.log("axios err", err);
    }
  };

  const onSubmit = async (values: any) => {
    setEditMode(false);
    await patchdata(values);
  };

  const handleimgfile = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    // if (file) {
    //   const reader = new window.FileReader();
    //   reader.onload = async () => {
    //     const url = URL.createObjectURL(file)
    //     console.log("imgurl", url)
        
    //     const img = {
    //       imgurl: url,
    //     };

    //     patchdata({ ...img });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = firebase.
      const fileRef = storageRef.child(selectedFile.name);

      try {
        // Upload the file to Firebase Storage
        await fileRef.put(selectedFile);

        // Get the download URL of the uploaded file
        const downloadURL = await fileRef.getDownloadURL();
        setImageURL(downloadURL);

        console.log('File uploaded successfully:', downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  useEffect(() => {
    setValue("name", userDetails.name);
    setValue("email", userDetails.email);
    setValue("role", userDetails.role);
    setValue("gender", userDetails.gender);
    setValue("phonenumber", userDetails.phonenumber);
    setValue("city", userDetails.city);
    setValue("state", userDetails.state);
    setValue("country", userDetails.country);
    setValue("PinCode", userDetails.PinCode);
  }, [userDetails]);

  return (
    <Container className="profilepage">
      {userDetails ? (
        <Row>
          
          <h2 className="profiletitle">Hello, {userDetails.name}!</h2>
          <div className="profilepic_card ">
            <div className="profileimg col-xs-5">
              {userDetails && (
                <img
                  className="profileimg"
                  src={userDetails?.imgurl}
                  alt="Selected Profile Picture"
                />
              )}
              {!editMode ? null : (
                <>
                <input
                  type="file"
                  name="imgurl"
                  accept="image/*"
                  onChange={handleimgfile}
                />
                <button onClick={handleUpload}>upload</button></>
              )}
            </div>

            <div >
              <form className="formclass " onSubmit={handleSubmit(onSubmit)}>
                {editMode ? (
                  <input type="submit" className="savebtn" />
                ) : (
                  <button className="editbtn" onClick={handleEdit}>
                    Edit
                  </button>
                )}
                

                <h4>UserId: {userDetails.id} </h4>

                <div className="userdetails col-xs-7">
                  <div className="userdetailscontainer1">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      {...register("name")}
                      className="nameinputel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.name?.message}
                    </small>
                    <br />
                    <label>Email Address:</label>
                    <input
                      type="text"
                      {...register("email")}
                      className="emailinputel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.email?.message}
                    </small>
                    <br />
                    <label className="radioclass">Your Gender:</label>
                    Male:{" "}
                    <input
                      type="radio"
                      {...register("gender", { required: true })}
                      defaultValue="Male"
                      className="inputradio"
                      disabled={!editMode}
                    />
                    Female:{" "}
                    <input
                      type="radio"
                      {...register("gender", { required: true })}
                      defaultValue="Female"
                      className="inputradio"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.gender?.message}
                    </small>
                    <br />
                    <label>Phone number:</label>
                    <input
                      type="text"
                      {...register("phonenumber")}
                      className="phoneinputel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.phonenumber?.message}
                    </small>
                    <br />
                    <label>Role:</label>
                    <input
                      type="text"
                      {...register("role")}
                      className="roleinputel"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type="text"
                      {...register("city")}
                      className="cityel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.city?.message}
                    </small>
                    <br />
                    <label>State</label>
                    <input
                      type="text"
                      {...register("state")}
                      className="stateel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.state?.message}
                    </small>
                    <br />
                    <label>Country</label>
                    <input
                      type="text"
                      {...register("country")}
                      className="countryel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.country?.message}
                    </small>
                    <br />
                    <label>Postal address</label>
                    <input
                      type="number"
                      {...register("PinCode")}
                      className="postalel"
                      disabled={!editMode}
                    />
                    <br />
                    <small className="validationerror">
                      {errors.PinCode?.message}
                    </small>
                    <br />
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </Row>
      ) : (
        <p>Loading...</p>
      )}
      <Footer/>
    </Container>
  );
};

export default Profilepage;
