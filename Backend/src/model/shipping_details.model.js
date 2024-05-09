import mongoose, { Schema } from "mongoose";
const shippingDetailSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    shipping_id: {
      type: String,
      unique: true,
      required: true,
    },
    order_id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const ShippingDetail = mongoose.model(
  "ShippingDetail",
  shippingDetailSchema
);
