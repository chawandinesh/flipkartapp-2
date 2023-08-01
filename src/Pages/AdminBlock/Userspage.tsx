import React, { useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeder";
import axios from "axios";
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { toast } from "react-toastify";
import {IoMdClose} from "react-icons/io"
import {GrEdit} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md'

const schema =yup
  .object({
    name:yup.string().required("*Required"),
    email:yup.string().required("*Required"),
    gender:yup.string().required("*Required"),
    phonenumber:yup.string().required("*Required"),
    role:yup.string().required("*Required"),

  }).required()

const Userspage = () => {
  const [users, setusers] = useState<any>([]);
  const [isuserpopupOpen, setisuserpopupOpen] = useState(false)
  const [editmode, setEditmode] = useState(false)
  const [editedData, setEditedData] = useState<any>({});
  const [editedRowIndex, setEditedRowIndex] = useState(-1);

  const {register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) })

  const getusers = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://192.168.0.149:4000/user`,
      });
      const userdata = response.data.filter(
        (item: any) => item.role === "User"
      );

      setusers(userdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  const handleAdduser =()=>{
    setisuserpopupOpen(true)
  }
  const onSubmit=async(values:any)=>{
    console.log(values)
    setisuserpopupOpen(false)
    try{
      const resp = await axios.post(`http://192.168.0.149:4000/user`,values)
      toast.success("successfully added User")
      getusers()
    }catch(err){
      console.log(err)
    }
  }
  const handleclose =()=>{
    setisuserpopupOpen(false)
  }

  const handledeluser =async(userid:any)=>{
    try{
      const resp = await axios.delete(`http://192.168.0.149:4000/user/${userid}`)
      alert("successfully deleted user")
      getusers()
    }catch(err){
      console.log(errors)
    }
  }

  const handleEditmode=(item:any, index:any)=>{
    setEditmode(true);
    setEditedData(item);
    setEditedRowIndex(index);
  }
  const handleSaveEdit = async (editedValues:any) => {
    setEditmode(false);
    setEditedData({}); // Clear edited data
    setEditedRowIndex(-1);

    try {
      const resp = await axios.put(
        `http://192.168.0.149:4000/user/${editedData.id}`,
        editedValues
      );
      toast("Successfully updated User");
      getusers();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AdminHeader />
      <div className="userbg">
        <h1>Users List</h1>
        <button className="adduserbtn" onClick={handleAdduser}>Add User</button>
        {isuserpopupOpen&&(
          <>
          
          <form className="formclass " onSubmit={handleSubmit(onSubmit)}>
          <div className="userdetails popup">
          <IoMdClose className="closeicon" onClick={handleclose}/>
            <div className="userdetailscontainer1">
            
              <label>Full Name:</label>
              <input
                type="text"
                {...register("name")}
                className="nameinputel"
                
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
                
              />
              <br />
              <small className="validationerror">
                {errors.email?.message}
              </small>
              <br />
              <label className="radioclass">Your Gender:</label>
              
              <input
                type="radio"
                {...register("gender", { required: true })}
                defaultValue="Male"
                className="inputradio"
                
              />Male
             
              <input
                type="radio"
                {...register("gender", { required: true })}
                defaultValue="Female"
                className="inputradio"
                
              /> Female{" "}
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
                
              />
              <input type="submit"/>
            </div>
           
          </div>
        </form>
        </>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>UserId</th>
            <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users?.map((item:any, index:any) => (
            <tr key={index}>
              <td>{item.id}</td>
              {editmode && editedRowIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      defaultValue={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={editedData.email}
                      onChange={(e) =>
                        setEditedData({ ...editedData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={editedData.phonenumber}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          phonenumber: e.target.value,
                        })
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenumber}</td>
                </>
              )}
              <td>
                {editmode && editedRowIndex === index ? (
                  <button onClick={() => handleSaveEdit(editedData)}>
                    Save
                  </button>
                ) : (
                  <>
                    <GrEdit
                      onClick={() => handleEditmode(item, index)}
                      className="icon"
                    />
                    <MdDelete
                      onClick={() => handledeluser(item.id)}
                      className="delicon"
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userspage;

