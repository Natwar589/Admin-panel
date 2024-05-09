import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    order_id: {
      type: String,
      unique: true,
    },
    shipping_id:{
      type:String,
      unique:true,
    }
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", customerSchema);
