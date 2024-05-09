import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowCustomerData = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer data from the backend API
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/customers/getallcustomer"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    console.log(customerId);
    try {
      // Make DELETE request to backend API to delete customer
      await axios.delete(
        `http://localhost:8080/api/v1/customers/deletecustomerbyid/${customerId}`
      );

      // Update state to reflect the deleted customer
      setCustomers(customers.filter((customer) => customer._id !== customerId));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5">All Customers</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Customer Id</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-4 py-2">Order Id</th>
            <th className="border border-gray-300 px-4 py-2">Shipping Id</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {customer._id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.mobile}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.order_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.shipping_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    handleDelete(customer._id);
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

export default ShowCustomerData;
