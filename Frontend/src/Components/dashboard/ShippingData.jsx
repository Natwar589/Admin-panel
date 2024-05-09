import React, { useState, useEffect } from "react";
import axios from "axios";

const ShippingData = () => {
  const [shippingDetails, setShippingDetails] = useState([]);

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const response = await axios.get(
          "https://admin-panel-oc0r.onrender.com/api/v1/shippingDetails/getAll"
        );
        setShippingDetails(response.data);
      } catch (error) {
        console.error("Error fetching shipping details:", error);
      }
    };

    fetchShippingDetails();
  }, []);

  const handleDelete = async (shippingDetailID) => {
    console.log(shippingDetailID);
    try {
      // Make DELETE request to backend API to delete customer
      await axios.delete(
        `https://admin-panel-oc0r.onrender.com/api/v1/shippingDetails/deleteById/${shippingDetailID}`
      );

      // Update state to reflect the deleted customer
      setShippingDetails(
        shippingDetails.filter(
          (shippingDetail) => shippingDetail._id !== shippingDetailID
        )
      );
    } catch (error) {
      console.error("Error deleting shipping:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5">All Shipping Details</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Pincode</th>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Shipping ID</th>
          </tr>
        </thead>
        <tbody>
          {shippingDetails.map((shippingDetail) => (
            <tr key={shippingDetail._id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {shippingDetail.address}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {shippingDetail.city}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {shippingDetail.pincode}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {shippingDetail.order_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {shippingDetail.shipping_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    handleDelete(shippingDetail._id);
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

export default ShippingData;
