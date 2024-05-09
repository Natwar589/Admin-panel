import  { Router } from "express";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "../controller/customer.controller.js";

const customerRouter = Router();

// Create a new customer
customerRouter.route("/create-customer").post(createCustomer);

// Get all customers
customerRouter.route("/getallcustomer").get(getAllCustomers);

// Get customer by ID
customerRouter.route("/getcustomerbyid/:id").get(getCustomerById);

// Update customer by ID
customerRouter.route("/updateCustomerbyid/:id").put(updateCustomerById);

// Delete customer by ID
customerRouter.route("/deletecustomerbyid/:id").delete(deleteCustomerById);

export default customerRouter;
