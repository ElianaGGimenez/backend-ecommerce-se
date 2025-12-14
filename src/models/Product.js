import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  img: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
