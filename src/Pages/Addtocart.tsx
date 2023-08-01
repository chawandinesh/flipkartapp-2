import Header from "../Components/Header";
// import productData from "../assets/MobilesData.json";
import { useContext, useEffect, useState, } from "react";
import { cartContext } from "../Components/context";
import axios from "axios";
import Footer from "../Components/Footer";
import {useForm} from 'react-hook-form';
import Config from "../Components/Config";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";



const Addtocart = () => {
  const { cart, setcart }: any = useContext(cartContext);
  const [adresspopupopen, setAdresspopupopen] = useState<boolean>(false)

  let totalQty = 0;
  cart?.forEach((item: any) => {
    totalQty += item.count;
  });

  const {register, handleSubmit} = useForm()

  const prices = cart?.map((item: any) => item.Price * item.count);

  const sum = 0;
  const totalprice = (prices: any) => {
    return prices.reduce((sum: number, current: number) => sum + current, 0);
  };
  const total = totalprice(prices);

  const handleremove = async (index: number) => {
    const filteredData = cart.find((item: any, idx: number) => {
      return index === idx;
    });

    if (filteredData) {
      try {
        const response = await axios({
          method: "Delete",
          url: `${Config.apikeycartitems}/${filteredData.id}`
        });
        console.log(response.data);
        getCartItems();
      } catch (err: any) {
        console.log("axiosDelerr", err.message);
      }
    }
  };

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
  const userId = localStorage.getItem("userid");

  const postOrders = async (Data: any) => {
    try {
      const resp = await axios({
        method: "POST",
        url: Config.apikeyorders,
        data: Data,
      });
      console.log("orders resp", resp.data);
    } catch (err) {
      console.log("orders err", err);
    }
  };

  const handleOrder = async (e: any) => {
    const dateTime = new Date();
     const products = cart.map((item:any)=>{
      return {...item, date:dateTime}
     })

    const orderdetails = {
      
      items: products,
      totalAmount: total,
      userid: userId,
    };

    postOrders({ ...orderdetails });

    for (const item of cart) {
      const itemid = item.id;
      console.log(itemid);
      try {
        const resp = await axios({
          method: "DELETE",
          url: `${Config.apikeycartitems}/${itemid}`,
        });
        console.log("delete resp", resp.data);
      } catch (error) {
        console.log("delete err", error);
      }
    }

    getCartItems();
  };

  const handleaddress = ()=>{
    
    setAdresspopupopen(true)
  }
  

  const submit =(values:any)=>{
    setAdresspopupopen(false)
    console.log(values)
  }

  return (
    <div>
      <Header />

      <div className="cartContainer">
        <div className="addressCard">
          <p className="addressp">From saved address</p>
          <button className="addressbtn" onClick={handleaddress}>Enter Delivery Pincode</button>
        </div>
        {adresspopupopen &&(
          <div className="popup">
            <form className="addressform" onSubmit={handleSubmit(submit)}>
              <label>Area:</label><br/>
              <input {...register("area")} type ="text"/><br/>
              <label>Lang:</label><br/>
              <input {...register("lang")} type="text"/><br/>
              <label>Lat:</label><br/>
              <input {...register("lat")} type="text"/><br/>
              <input type="submit"/>
            </form>
            
          </div>
        )}
        <div className="itemscard">
          {cart.length > 0 ? (
            cart.map((item: any, index: number) => (
              <div className="cartmainflex" key={index}>
                <div className="flexbox">
                  <div className="cartitemcard">
                    <div className="imgcard">
                      <img className="imgContainer" src={item.url} />
                    </div>
                    <div className="imgDesc">
                      <p>
                        <strong>{item.Name}</strong>
                      </p>
                      <p>{item.Desc}</p>
                      <p>Seller: ECOMTAMSINRetail</p>
                      <p className="price">
                        <span className="pricestricke">
                          ₹{item.Price1.toLocaleString()}
                        </span>
                        {"  "}₹{item.Price.toLocaleString()}
                      </p>

                      <p>Qty:{item.count}</p>
                      <p className="pindesc">
                        {" "}
                        Enter Pincode to see if the Product is in Stock
                      </p>
                      <div>
                        <button
                          className="removeBtn"
                          onClick={() => handleremove(index)}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="PriceDetails">
                  <p className="p1">PRICE DETAILS</p>
                  <hr />
                  <div className="Orderdetailsflex">
                    <p>Price({totalQty} items)</p>
                    <p>₹{total.toLocaleString()}</p>
                  </div>
                  <div className="Orderdetailsflex">
                    <p>
                      Discount (
                      <span className="discountspan">10% on Price</span>)
                    </p>
                    <p className="discountspan">
                      -₹{Math.ceil(total * 0.1).toLocaleString()}
                    </p>
                  </div>
                  <div className="Orderdetailsflex">
                    <p>Delivery Chanrges</p>
                    <p className="discountspan">Free</p>
                  </div>
                  <hr />
                  <div className="Orderdetailsflex">
                    <h5>Total Amount</h5>
                    <h5>
                      ₹{(total - Math.ceil(total * 0.1)).toLocaleString()}
                    </h5>
                  </div>
                  <button className="orderBtn" onClick={handleOrder}>
                    PLACE ORDER
                  </button>
                  <hr />
                  <p className="priceDesc">
                    You will save ₹{Math.ceil(total * 0.1).toLocaleString()}{" "}
                    Rupees on this Order
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h4 className="cartemptystatus">Your cart is empty</h4>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Addtocart;
