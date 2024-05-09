import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const navigate = useNavigate(); // Get the navigate function

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        formData
      );
      console.log("Response from backend:", response.data);

      // Save username to local storage if login is successful
      const { userName } = formData;
      localStorage.setItem("username", userName);

      // Navigate to the dashboard if login is successful
      navigate("/dashboard");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#f3e1e3] font-montserrat">
        <main className="flex  items-center justify-center w-full  px-20 text-center">
          <div className="flex  max-w-4xl bg-white rounded-[10px] shadow-lg shadow-gray-500">
            <div className="p-2">
              <form onSubmit={handleSubmit}>
                <div className="py-10">
                  <h2 className="text-3xl font-extrabold">Login</h2>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                    />
                  </div>
                  <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="py-3 my-4 w-[70px] bg-[#FF4B2B] hover:bg-[#ff6e54] text-white text-sm font-bold uppercase rounded-md tracking-widest"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
