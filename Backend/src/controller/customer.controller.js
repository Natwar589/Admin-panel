import { Customer } from "../model/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/token.js";
import { v4 as uuidv4 } from "uuid";
// Create a new customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    throw new ApiError(400, "Please provide name, email, and mobile");
  }
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(400, "Email is already registered");
  }
  const uniqueId = uuidv4();
  const shipid = uuidv4();
  const customer = await Customer.create({
    name,
    email,
    mobile,
    order_id: uniqueId,
    shipping_id: shipid,
  });

  // const token = generateToken({ customerId: customer._id });
  // res.cookie("customerId", token, { maxAge: 86400000 });

  // Set the token in a cookie with a specified expiration time
  // Set the token in a cookie with a specified expiration time

  const response = new ApiResponse(
    201,
    customer,
    "Customer created successfully"
  );
  res.status(201).json(response);
});

// Get all customers
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

// Get customer by ID
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  res.status(200).json(customer);
});

// Update customer by ID
const updateCustomerById = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    throw new ApiError(400, "Please provide name, email, and mobile");
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name, email, mobile },
    { new: true }
  );
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  res.status(200).json(customer);
});

// Delete customer by ID
const deleteCustomerById = asyncHandler(async (req, res) => {
  const customer =
    (await Customer.findByIdAndDelete(req.params.id)) ||
    (await Customer.findByIdAndDelete(req._id));
  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  const response = new ApiResponse(200, null, "Customer deleted successfully");
  res.status(200).json(response);
});

export {
  createCustomer,
  deleteCustomerById,
  updateCustomerById,
  getCustomerById,
  getAllCustomers,
};
