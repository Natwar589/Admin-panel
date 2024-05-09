import axios from "axios";
import React, { useState } from "react";
import Navbar from "../dashboard/Navbar";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    userName: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add form validation logic here before submitting the data
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        formData
      );
      console.log("Response from backend:", response.data);

      
      const { userName } = formData;
      localStorage.setItem("username", userName);

      navigate("/dashboard");
      // Optionally, you can redirect the user or perform other actions after successful registration
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
    // Reset form after submission
    setFormData({
      fullname: "",
      email: "",
      password: "",
      userName: "",
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#f3e1e3] font-montserrat">
        <main className="flex  items-center justify-center w-full  px-20 text-center">
          <div className="flex  max-w-4xl bg-white rounded-[10px] shadow-lg shadow-gray-500">
            <div className="p-2">
              {" "}
              <form action="" onSubmit={handleSubmit}>
                <div className="py-10">
                  <h2 className="text-3xl font-extrabold">Sign UP</h2>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your Full Name"
                      required
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                    />
                  </div>
                  <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter your User Name"
                      required
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"
                    />
                  </div>
                  <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email Email"
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
                    <button className=" py-3 my-4 w-[80px]  bg-[#FF4B2B] hover:bg-[#ff6e54]  text-white text-sm font-bold uppercase rounded-md  tracking-widest">
                      Sign Up
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

export default Signup;
