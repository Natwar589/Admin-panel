import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "../controller/order.controller.js";

const orderRouter = express.Router();

// Create a new purchase order
orderRouter.post("/create", createOrder);

// Get all purchase orders
orderRouter.get("/getAll", getAllOrders);

// Get purchase order by ID
orderRouter.get("/getById/:id", getOrderById);

// Update purchase order by ID
orderRouter.put("/updateById/:id", updateOrderById);

// Delete purchase order by ID
orderRouter.delete("/deleteById/:id", deleteOrderById);

export default orderRouter;
