import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Product = mongoose.model("product", productSchema);
