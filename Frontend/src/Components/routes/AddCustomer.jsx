import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    object_id: "",
    shipping: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://admin-panel-oc0r.onrender.com/api/v1/customers/create-customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const data = await response.json();

      console.log("Customer created successfully:", data.data.order_id);
      console.log("Customer created successfully:", data.data.shipping_id);

      navigate(
        `/addorder?orderId=${data.data.order_id}&shippingId=${data.data.shipping_id}`
      );

      // Optionally, redirect to another page or display a success message
    } catch (error) {
      console.error("Error creating customer:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-4 bg-white border rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-1">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
