import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {signinuserdetailsContex} from '../Components/context'
import Home from "../Pages/Home";
// import MobilePage from "../Pages/MobilePage";
import ProductPage from "../Pages/Productpage";
import Addtocart from "../Pages/Addtocart";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import { useContext } from "react";
import Profilepage from "../Pages/profilepage";
import Orderpage from "../Pages/Orderpage";
import Adminpage from "../Pages/AdminBlock/Adminpage";
import Userspage from "../Pages/AdminBlock/Userspage";
import Customers from "../Pages/AdminBlock/Customers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/product/:Categoryname" element={<ProductPage />} />
        <Route path="/Addtocart" element={<PrivateRoute element={<Addtocart />} />} />
        <Route path ="/profile" element={<PrivateRoute element ={<Profilepage/>}/>}/>
        <Route path ="/orders" element={<PrivateRoute element ={<Orderpage/>}/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/admin" element={<PrivateRoute element={<Adminpage/>}/>}/>
        <Route path="/admin/users" element={<PrivateRoute element={<Userspage/>}/>}/>
        <Route path="/admin/customers" element={<PrivateRoute element={<Customers/>}/>}/>
      </Routes>
    </Router>
  );
};

const PrivateRoute =({element})=>{
    const {userdetails} = useContext<any>(signinuserdetailsContex)
    console.log(userdetails)
    // const navigate = useNavigate()
    return (localStorage.getItem("userid"))?element:<Navigate to="/Login"/>
}

export default AppRoutes;
