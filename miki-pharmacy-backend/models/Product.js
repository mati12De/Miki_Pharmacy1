import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    variant: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    packSizes: { type: [String], default: [] },
    description: { type: String, default: "" },
    ingredients: { type: String, default: null },
    howToUse: { type: String, default: "" },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
