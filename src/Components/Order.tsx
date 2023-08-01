import react from "react";

const Order:React.FC<any> = (props) => {

  const dateTime = new Date(props.date).toLocaleString();
  console.log(dateTime);

  return (
    <div className="ordercontainer">
      <img className="imgcls" src={props.imgurl} alt="Item pic" />

      <p>
        <strong>{props.name}</strong><br/>
        Qty:{props.qty}
        
  
      </p>
      

      <p>
        ₹{(props.price).toLocaleString()}
      </p>
      

      <p>
        Ordered on <br/>{dateTime}
      </p>
    </div>
  );
};

export default Order;
