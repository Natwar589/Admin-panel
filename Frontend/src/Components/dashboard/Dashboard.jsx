import React from "react";
import Navbar from "./Navbar";
import ShowCustomerData from "./ShowCustomerData";

import OrderData from "./OrderData";
import ShippingData from "./ShippingData";
import { useNavigate } from "react-router-dom";
import useCheck from "../hooks/useCheck.js";

const Dashboard = () => {
  const username = useCheck();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      {username ? (
        <div>
          <div className="p-4">
            <button
              onClick={() => navigate("/addcustomer")} // Pass a function to onClick
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Customer
            </button>
          </div>
          <ShowCustomerData />
          <OrderData />
          <ShippingData />
        </div>
      ) : (
        <div className="flex w-full h-[100vh] justify-center items-center font-extrabold text-[25px]">
          Please Login First
        </div>
      )}
    </div>
  );
};

export default Dashboard;
