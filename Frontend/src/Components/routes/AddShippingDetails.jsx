import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddShippingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [shippingId, setShippingId] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    order_id: "", // Changed from object_id
    shipping_id: "", // Changed from shipping_id
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderIdParam = searchParams.get("orderId");
    const shippingIdParam = searchParams.get("shippingId");
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }
    if (shippingIdParam) {
      setShippingId(shippingIdParam);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.order_id = orderId;
    formData.shipping_id = shippingId;
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/shippingDetails/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create shipping details");
      }

      const data = await response.json();
      navigate("/dashboard");
      console.log("Shipping details created successfully:", data);
      // Optionally, redirect to another page or display a success message
    } catch (error) {
      console.error("Error creating shipping details:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-4 bg-white border rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Enter Shipping Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block mb-1">
              Pincode:
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
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

export default AddShippingDetails;
