import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Header from "../Components/Header";
import Order from "../Components/Order";
import Footer from "../Components/Footer";
import Config from "../Components/Config";

const Orderpage = () => {
  const [orders, setOrders] = useState<any>([]);
  const [displaydata, setdisplaydata] = useState<any>([]);
  const [originalData, setOriginaldata] = useState<any>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const currentuserid = localStorage.getItem("userid");

  const getorders = async () => {
    try {
      const resp = await axios({
        method: "GET",
        url: Config.apikeyorders,
      });
      setOrders(resp.data);
      const filteredorders = resp.data.filter(
        (item: any) => item.userid == currentuserid
      );
      let data: any = [];
      filteredorders.forEach((element: any) => {
        data.push([...element.items]);
      });
      const flattenedArray = data.flat().map((obj: any) => obj);
      setdisplaydata(flattenedArray);
      setOriginaldata(flattenedArray);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getorders();
  }, []);

  const handlechecked = (e: any) => {
    const ischecked = e.target.checked;
    const filtername = e.target.name;

    let updatedFilters = [...appliedFilters];
    let newdata = [...originalData];

    if (ischecked) {
      updatedFilters.push(filtername);
    } else {
      updatedFilters = updatedFilters.filter((filter) => filter !== filtername);
    }

    if (updatedFilters.length > 0) {
      updatedFilters.forEach((filter) => {
        switch (filter) {
          case "below500":
            newdata = newdata.filter((item: any) => item.Price < 500);

            break;
          case "below1000":
            newdata = newdata.filter((item: any) => item.Price < 1000);
            break;
          case "below10000":
            newdata = newdata.filter((item: any) => item.Price < 10000);
            break;
          case "above10000":
            newdata = newdata.filter((item: any) => item.Price > 10000);
            break;
          case "Mobiles":
            newdata = newdata.filter((item: any) => item.categoryid === "A");
            break;
          case "Fashion":
            newdata = newdata.filter((item: any) => item.categoryid === "B");
            break;
          case "Electronics":
            newdata = newdata.filter((item: any) => item.categoryid === "C");
            break;
          case "Appliances":
            newdata = newdata.filter((item: any) => item.categoryid === "D");
            break;
          default:
            break;
        }
      });
    }

    setdisplaydata(newdata);
    setAppliedFilters(updatedFilters);
  };

  useEffect(() => {
    handlechecked;
  }, [handlechecked]);

  const priceArray = displaydata.map((item: any) => item.Price * item.count);
  console.log(priceArray);
  const sum = priceArray.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue,
    0
  );

  return (
    <div>
      <Header />
      <div className="ordersbg">
        <div className="ordersSidesection">
          <h6>Order Amount</h6>
          <div className="filter1">
            <p>
              <input type="checkbox" name="below500" onClick={handlechecked} />{" "}
              Below 500
            </p>
            <p>
              <input type="checkbox" name="below1000" onClick={handlechecked} />{" "}
              Below 1000
            </p>
            <p>
              <input
                type="checkbox"
                name="below10000"
                onClick={handlechecked}
              />{" "}
              Below 10,000
            </p>
            <p>
              <input
                type="checkbox"
                name="above10000"
                onClick={handlechecked}
              />{" "}
              Above 10,000
            </p>
          </div>
          <hr />
          <h6>Category Name</h6>
          <div className="filter1">
            <p>
              <input type="checkbox" name="Mobiles" onClick={handlechecked} />{" "}
              Mobiles
            </p>
            <p>
              <input type="checkbox" name="Fashion" onClick={handlechecked} />{" "}
              Fashion
            </p>
            <p>
              <input
                type="checkbox"
                name="Electronics"
                onClick={handlechecked}
              />{" "}
              Electronics
            </p>
            <p>
              <input
                type="checkbox"
                name="Appliances"
                onClick={handlechecked}
              />{" "}
              Appliances
            </p>
          </div>
        </div>
        <div className="ordercardbg">
          {displaydata.length > 0 ? (
            displaydata.map((item: any, index: any) => (
              <Order
                key={index}
                name={item?.Name}
                price={item?.Price}
                imgurl={item?.url}
                qty={item?.count}
                date={item?.createdAt}
              />
            ))
          ) : (
            <h3 className="ordersemptystate">
              Oops! You don't have Previous Orders
            </h3>
          )}
        </div>
        <div className="totalvalue">
          <h5>
            Total Amount <br /> ₹ {sum.toLocaleString()}{" "}
          </h5>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Orderpage;
