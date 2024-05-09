import mongoose, { Schema } from "mongoose";

const purchaseOrderSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_quantity: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    order_id: {
      type:String,
      unique:true,
      required:true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", purchaseOrderSchema);
