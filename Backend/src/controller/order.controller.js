import { Order } from "../model/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  const { product_name, product_quantity, price, mrp, order_id } = req.body;
  if (!product_name || !price || !mrp || !product_quantity) {
    throw new ApiError(
      400,
      "Please provide product name, product quantity, price,orderId and MRP"
    );
  }

  // const token = req.cookies.customerId;
  // const decoded = verifyToken(token);
  // const { customerId } = decoded;

  // const customer = await Customer.findById(customerId);
  // if (!customer) {
  //   console.log("Customer not found", 400);
  // }
  // console.log(customer);

  const order = await Order.create({
    product_name,
    product_quantity,
    price,
    mrp,
    order_id,
  });

  res.status(201).json({
    status: 201,
    data: order,
    message: "Order created successfully",
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, "Purchase order not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order created successfully"));
});

const updateOrderById = asyncHandler(async (req, res) => {
  const { product_name, product_quantity, price, mrp, customer_id } = req.body;

  if (!product_name || !price || !mrp || !customer_id) {
    throw new ApiError(
      400,
      "Please provide product name, price, MRP, and customer ID"
    );
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      product_name,
      product_quantity,
      price,
      mrp,
      customer_id,
    },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(404, "Purchase order not found");
  }

  res.status(200).json(updatedOrder);
});

const deleteOrderById = asyncHandler(async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) {
    throw new ApiError(404, "Purchase order not found");
  }
  res.status(200).json({ message: "Purchase order deleted successfully" });
});

export {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
