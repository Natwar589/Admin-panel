import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderData = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://admin-panel-oc0r.onrender.com/api/v1/orders/getAll"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    console.log(orderId);
    try {
      // Make DELETE request to backend API to delete customer
      await axios.delete(
        `https://admin-panel-oc0r.onrender.com/api/v1/orders/deleteById/${orderId}`
      );

      // Update state to reflect the deleted customer
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting shipping:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5">All Orders</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">MRP</th>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {order.product_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.product_quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">{order.mrp}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.order_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    handleDelete(order._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderData;
