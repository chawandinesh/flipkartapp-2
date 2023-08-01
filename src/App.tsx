import { useState } from "react";
import "./App.css";
import {
  context,
  categoryContext,
  searchcontext,
  cartContext,
  signinuserdetailsContex,
} from "./Components/context.tsx";
import categorydata from "./assets/CategoryCard.json";
import totaldata from "./assets/TotalData.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  const [search, setsearch] = useState<any>("");
  const [cart, setcart] = useState<any>([]);
  const [userdetails, setuserdetails] = useState<any>({
    isloggedin: false,
    user: {},
  });
  return (
    <div>
      <categoryContext.Provider value={categorydata}>
        <context.Provider value={totaldata}>
          <searchcontext.Provider value={{ search, setsearch }}>
            <cartContext.Provider value={{ cart, setcart }}>
              <signinuserdetailsContex.Provider
                value={{ userdetails, setuserdetails }}
              >
                <AppRoutes />
                <ToastContainer position="top-center" autoClose={2000}/>
              </signinuserdetailsContex.Provider>
            </cartContext.Provider>
          </searchcontext.Provider>
        </context.Provider>
      </categoryContext.Provider>
    </div>
  );
}

export default App;
