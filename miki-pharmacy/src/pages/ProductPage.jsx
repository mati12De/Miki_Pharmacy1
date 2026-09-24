import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

const tabs = ["Description", "Ingredients", "How to Use", "Reviews"];

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`,
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);
        setSelectedPack(0);
        setQuantity(1);
        setActiveTab("Description");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <p className="text-center py-16 text-gray-400">Loading product...</p>
    );

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/" className="text-brand-green font-medium hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p._id !== product._id,
  );

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  function handleBuyNow() {
    addToCart(product, quantity);
    navigate("/checkout");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-green">
          Home
        </Link>
        {" > "}
        <Link
          to={`/category/${product.category}`}
          className="hover:text-brand-green capitalize"
        >
          {product.category.replace("-", " ")}
        </Link>
        {" > "}
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="bg-gray-50 rounded-xl aspect-square flex items-center justify-center p-6 mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index
                    ? "border-brand-green"
                    : "border-gray-200"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  % off
                </span>
              </>
            )}
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Pack Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.packSizes.map((size, index) => (
                <button
                  key={size}
                  onClick={() => setSelectedPack(index)}
                  className={`px-4 py-2 rounded-lg text-sm border ${
                    selectedPack === index
                      ? "bg-brand-green text-white border-brand-green"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Quantity</p>
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-green text-white font-medium py-3 rounded-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-brand-green text-brand-green font-medium py-3 rounded-lg"
            >
              Buy Now
            </button>
          </div>

          <div className="flex gap-6 mt-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} /> Genuine Product
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw size={14} /> Easy Returns
            </span>
            <span className="flex items-center gap-1">
              <Lock size={14} /> Secure Payment
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-brand-green text-brand-green"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 text-sm text-gray-700 leading-relaxed">
          {activeTab === "Description" && <p>{product.description}</p>}
          {activeTab === "Ingredients" && (
            <p>
              {product.ingredients || "No ingredient information available."}
            </p>
          )}
          {activeTab === "How to Use" && <p>{product.howToUse}</p>}
          {activeTab === "Reviews" && (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
