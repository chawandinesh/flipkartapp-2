import Header from "../Components/Header";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import {cartContext, signinuserdetailsContex} from '../Components/context';
import Courosel from "../Components/Courosel";
import { useContext, useEffect } from "react";
import { categoryContext } from "../Components/context";
import axios from "axios";
import Footer from "../Components/Footer";
import Config from "../Components/Config";

const Home = () => {
  const categorydata = useContext(categoryContext);
  const { cart, setcart } = useContext(cartContext);

  // console.log(categorydata);
  const navigate = useNavigate();
  const handleNavigate = (categoryName: string) => {
    navigate(`/product/${categoryName}`);
  };

  const {userdetails, setuserdetails} = useContext<any>(signinuserdetailsContex);

  console.log(userdetails)
  const getCartItems = async () => {
    try {
      const resp = await axios.get(Config.apikeycartitems);
      setcart(resp.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);


  return (
    <div className="mainContainer">
      <Header />
      <div>
        <Courosel />
      </div>
      <div className="row2">
        <h2>Products</h2>
        <div className="rowflex">
          {categorydata.map((item: any, index: any) => {
            return (
              <div onClick={() => handleNavigate(item.title)}>
                <ProductCard
                  key={index}
                  id={item.id}
                  url={item.url}
                  title={item.title}
                />
              </div>
            );
          })}
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
