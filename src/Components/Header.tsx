import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { searchcontext, cartContext } from "./context";
import { FaShoppingCart } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import {CgProfile} from 'react-icons/cg';
import {RiAdminFill, RiCoupon3Fill} from 'react-icons/ri'
import {AiOutlineHeart} from 'react-icons/ai'
import {signinuserdetailsContex} from '../Components/context'
import {BsPersonFill, BsGearFill, BsBoxSeam, BsGiftFill} from 'react-icons/bs'
import  axios from 'axios'
import Config from "./Config";

const Header = () => {

 const [isdropdownopen, setisdropdownopen] = useState(false)
 const[currentuser, setCurrentuser] = useState<any>({})
  const { cart } = useContext(cartContext);

  const { search, setsearch } = useContext(searchcontext);

  const {userdetails, setuserdetails} = useContext<any>(signinuserdetailsContex)

  
  
    
    const userId = localStorage.getItem("userid")

  const getuser =async()=>{
    
    try{
      const resp = await axios .get(`${Config.apikeyusers}/${userId}`) 
      console.log("response",resp.data)
      setCurrentuser(resp.data)
    }catch(err){
      console.log(err)
    }
  }
    
 useEffect(()=>{
  getuser()
 }, [userdetails])
console.log("user",currentuser)
  

  const navigate = useNavigate();
  const handlecarticon = () => {
    {!(localStorage.getItem("userid"))?navigate("/login"):navigate("/Addtocart")}
    console.log(cart)
  };
  const handlelogin = () => {
    navigate("/Register");
  };
  const handlelogout = ()=>{
    localStorage.clear()
    setuserdetails({...userdetails, isloggedin:false, user:{}})
    // console.log(userdetails)
  }
const handledropdown =()=>{
  setisdropdownopen(!isdropdownopen)
}


  const handleinput = (e: any) => {
    const lowertext = e.target.value.toLowerCase();
    setsearch(lowertext);
  };
  const handleprofile =()=>{
    navigate("/profile")
  }
  const navigateorders =()=>{
    navigate("/orders")
  }
  const handlelogo =()=>{
    navigate("/")
  }
  const navigateadmin=()=>{
    navigate("/admin")
  }

  return (
    <header>
      <div className="Headercontainer">
        <div>
          <img
            onClick={handlelogo}
            className="flipkartimg"
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
            alt="Image Loading..."
          />
          <p className="Headerpara">
            <a className="Headerexplore" href="/">
              Explore <span className="Headerspan">plus</span>
            </a>
          </p>
        </div>

        <div>
          <input
            className="Headerinput"
            type="text"
            placeholder="Search for products, brands and more"
            onChange={handleinput}
          />
          <i className="Headerinputicon">
            <BiSearch />
          </i>
        </div>
        {localStorage.getItem("userid")? <button className="LogBtn" onClick={handlelogout}>
          Logout
        </button>:<button className="LogBtn" onClick={handlelogin}>
          Login/Register
        </button>}
        
        <p> Become a seller</p>
        <p onClick={handlecarticon}>
          <FaShoppingCart className="icon" />
          
          {(userId&&cart.length>0)? (
            <span className="cartItemCount">{cart.length}</span>
          ):null}
          Cart
        </p>
        {currentuser.imgurl?(<img onClick = {handledropdown} className="profileicon" src={currentuser.imgurl}/>):(<CgProfile onClick = {handledropdown} className="profileicon"/>)}
        
        {localStorage.getItem("userid")?<p className="Username">Hello, {localStorage.getItem("username")}</p>:null}
        {isdropdownopen?(
          <div className="dropdown">
            {localStorage.getItem("userid")?
            <>
            <li onClick={handleprofile}><BsPersonFill className="dropdownicon"
            />My profile</li>
            <li onClick={navigateorders}><BsBoxSeam className="dropdownicon" />Orders</li>
            <li><AiOutlineHeart className="dropdownicon"/>Wishlist</li></>:null
            }
            {localStorage.getItem("role")==="Admin"?(<li onClick={navigateadmin}><RiAdminFill className="dropdownicon"/>Admin</li>):null}
            <li><RiCoupon3Fill className="dropdownicon"/>Coupons</li>
          <li><BsGiftFill className="dropdownicon"/>Gift cards</li>
          <li><BsGearFill className="dropdownicon"/>settings</li>
          </div>
        ):(null)
        }
        
        
      </div>
    </header>
  );
};

export default Header;


