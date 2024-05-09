import express from "express";
import {
  createShippingDetail,
  getAllShippingDetails,
  getShippingDetailById,
  updateShippingDetailById,
  deleteShippingDetailById,
} from "../controller/shipping_details.controller.js";

const detailsRouter = express.Router();

// Create a new shipping detail
detailsRouter.post("/create", createShippingDetail);

// Get all shipping details
detailsRouter.get("/getAll", getAllShippingDetails);

// Get shipping detail by ID
detailsRouter.get("/getById/:id", getShippingDetailById);

// Update shipping detail by ID
detailsRouter.put("/updateById/:id", updateShippingDetailById);

// Delete shipping detail by ID
detailsRouter.delete("/deleteById/:id", deleteShippingDetailById);

export default detailsRouter;
