import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddOrder = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState("");
  const [shippingId, setShippingId] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    product_quantity: "",
    price: "",
    mrp: "",
    order_id: "",
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
    console.log(orderId, shippingId);
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.order_id = orderId; // Set orderId from state
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log("Order created successfully:", data);

      navigate(
        `/addShippingAddress?orderId=${orderId}&shippingId=${shippingId}`
      );
      // Optionally, redirect to another page or display a success message
    } catch (error) {
      console.error("Error creating order:", error);
      // Optionally, display an error message to the user
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-4 bg-white border rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="product_name" className="block mb-1">
              Product Name:
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-1">
              Quantity:
            </label>
            <input
              type="number"
              id="product_quantity"
              name="product_quantity"
              value={formData.product_quantity}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mrp" className="block mb-1">
              MRP:
            </label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
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

export default AddOrder;
