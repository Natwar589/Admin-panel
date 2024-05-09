import { Customer } from "../model/customer.model.js";
import { ShippingDetail } from "../model/shipping_details.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/token.js";

// Create a new shipping detail
const createShippingDetail = asyncHandler(async (req, res) => {
  const { address, city, pincode, order_id, shipping_id } = req.body;

  if (!address || !city || !pincode) {
    throw new ApiError(
      400,
      "Please provide address, city, pincode, order ID, and customer ID"
    );
  }
  // const token = req.cookies.customerId;
  // const { customerId } = verifyToken(token);

  // const customer = await Customer.findById(customerId);
  // if (!customer) throw new ApiError(400, "customer not found");

  // console.log("new id for order", customer?.order_id);

  const newShippingDetail = await ShippingDetail.create({
    address,
    city,
    pincode,
    order_id,
    shipping_id,
  });

  const response = new ApiResponse(
    201,
    newShippingDetail,
    "Shipping detail created successfully"
  );
  res.status(201).json(response);
});

// Get all shipping details
const getAllShippingDetails = asyncHandler(async (req, res) => {
  const shippingDetails = await ShippingDetail.find();
  res.status(200).json(shippingDetails);
});

// Get shipping detail by ID
const getShippingDetailById = asyncHandler(async (req, res) => {
  const shippingDetail = await ShippingDetail.findById(req.params.id);
  if (!shippingDetail) {
    throw new ApiError(404, "Shipping detail not found");
  }
  res.status(200).json(shippingDetail);
});

// Update shipping detail by ID
const updateShippingDetailById = asyncHandler(async (req, res) => {
  const { address, city, pincode, order_id, shipping_id } = req.body;

  if (!address || !city || !pincode) {
    throw new ApiError(
      400,
      "Please provide address, city, pincode, order ID, and customer ID"
    );
  }

  const updatedShippingDetail = await ShippingDetail.findByIdAndUpdate(
    req.params.id,
    {
      address,
      city,
      pincode,
      order_id,
      shipping_id,
    },
    { new: true }
  );

  if (!updatedShippingDetail) {
    throw new ApiError(404, "Shipping detail not found");
  }

  res.status(200).json(updatedShippingDetail);
});

// Delete shipping detail by ID
const deleteShippingDetailById = asyncHandler(async (req, res) => {
  const deletedShippingDetail = await ShippingDetail.findByIdAndDelete(
    req.params.id
  );
  if (!deletedShippingDetail) {
    throw new ApiError(404, "Shipping detail not found");
  }
  res.status(200).json({ message: "Shipping detail deleted successfully" });
});

export {
  createShippingDetail,
  getAllShippingDetails,
  getShippingDetailById,
  updateShippingDetailById,
  deleteShippingDetailById,
};
