import { useContext, useState } from "react";
import { cartContext } from "./context";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const Product: React.FC<any> = (props) => {
  // setcart([...cart, props]);
  const [clickedwish, setclickedwish] = useState(false)


  const handlewishclick=()=>{
    setclickedwish(!clickedwish)
    console.log("wish",clickedwish);
  }

  return (
    <div>
      <div className="MobileCard1">
        <div className="imgcontainer">
          <img className="Mobileimg" src={props.url} alt="Image Loading..." />
          <div className="BtnContainer">
            <button onClick={props.addToCart} className="Btn1">
              Add to Cart
            </button>
            <button onClick = {props.buynow} className="Btn2">Buy Now</button>
          </div>
        </div>
        <div>
          <div onClick={handlewishclick}>
          {clickedwish?<AiTwotoneHeart  className="clickedwishicon"/>:<AiOutlineHeart  className="wishicon"/>}
          </div>
     
          
          <h6>
            <strong>{props.name}</strong>
          </h6>
          <p>
            <strong>RS {props.price}</strong>
          </p>
          <p>{props.Desc}</p>
          <p>
            <strong>Available Offers</strong>
          </p>
          <ul>
            <li>
              {props.offer1} <a href="">T&C</a>
            </li>
            <li>
              {props.offer2}
              <a href="">T&C</a>
            </li>
            <li>
              {props.offer3} <a href="">T&C</a>
            </li>
            <li>
              {props.offer4} <a href="">T&C</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
