import React from "react";
import useCheck from "../hooks/useCheck.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const username = useCheck();
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <>
      <div>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </>
  );
};

export default Logout;
