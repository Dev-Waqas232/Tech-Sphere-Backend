import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

export default Product;
