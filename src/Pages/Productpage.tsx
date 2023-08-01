import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "../Components/Header";
import Product from "../Components/product";
import { context, searchcontext, cartContext } from "../Components/context";
import axios from "axios";
import Footer from "../Components/Footer";
import Config from "../Components/Config";
import useRazorpay from 'react-razorpay' 

const ProductPage = () => {
  const data: any = useContext(context);
  const { search } = useContext(searchcontext);

  const { cart, setcart } = useContext(cartContext);

  let param = useParams();
  const category = param.Categoryname;

  let passingData = category ? data[category] : "";

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

  const addToCart = async (item: any) => {
    const userid = localStorage.getItem("userid");
    const categoryid = item.categoryid;
    const productid = item.productId;
    let count = 1;
    const itemdata = { ...item, count, userid };

    const checkCategory = cart.find(
      (each: any) =>
        each.userid === userid &&
        each.categoryid === categoryid &&
        each.productId === productid
    );

    if (checkCategory) {
      try {
        const response = axios({
          method: "PUT",
          url: `${Config.apikeycartitems}/${checkCategory.id}`,
          data: { ...checkCategory, count: checkCategory.count + 1 },
        });
        getCartItems();
      } catch (err: any) {
        console.error(err);
        alert("An error occurred while updating the cart items.");
      }
    } else {
      try {
        const res = axios({
          method: "POST",
          url: Config.apikeycartitems,
          data: itemdata,
        }).then((res) => {
          getCartItems();

          console.log(res.data);
        });
      } catch (err) {
        console.log("post Err", err);
      }
    }
  };

  const filteredData = search
    ? passingData.filter((el: any) =>
        el.Name.toLowerCase().includes(search.toLowerCase())
      )
    : passingData;

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
  const razorpay = useRazorpay()
  const loadScript=(src:any)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script")
      script.src = src

      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)

    })
    
  }
  
  const handlerazorpay =async(product:any)=>{
    
    const resp:any = await loadScript(`https://checkout.razorpay.com/v1/checkout.js`)
    if (!resp){
      alert("you are offline... failed to load...")
      return
    }

    const options ={
      key: Config.razorpaykey,
      currency:"INR",
      amount:product.Price*100,
      name:product.Name,
      description:"Thanks for purchasing",
      image:product.url,

      handler:function(response:any){
        alert(response.razorpay_payment_id)
        alert("Payment success")
      },
      prefill:{
        name:"BhanuChandar Reddy"
      }
    };
    const paymentobject = new window.Razorpay(options);
    paymentobject.open()
  }

  const buynow = (item: any) => {
    console.log(window)
    if (window.confirm("Are you sure you want to buy this item?")) {
    const date = new Date();
    const product = [{ ...item, createdAt: date, count:1 }];
    const userId = localStorage.getItem("userid");

    const itemdetails = {
      items: product,
      totalAmount: item.Price,
      userid: userId,
    };

    postOrders(itemdetails);
    handlerazorpay(item)
  }
  };

  return (
    <div>
      <Header />
      <div className="productcardoverflow">
        <div className="Mobilemaincontainer">
          {filteredData.length > 0 ? (
            filteredData.map((item: any, index: any) => (
              <Product
                key={index}
                id={item.id}
                url={item.url}
                name={item.Name}
                price1={item.Price1}
                price={item.Price}
                Desc={item.Desc}
                offer1={item.Offer1}
                offer2={item.Offer2}
                offer3={item.Offer3}
                offer4={item.Offer4}
                addToCart={() => addToCart(item)}
                buynow={() => buynow(item)}
              />
            ))
          ) : (
            <p className="nodatadesc">
              No products found for the specified category.
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductPage;
