import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

function BestSellingProducts() {
  const scrollRef = useRef(null);
  const { products, loading, error } = useProducts();

  function scrollRight() {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }

  const bestSellers = products.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Best Selling Products
        </h2>
        <Link
          to="/products"
          className="text-brand-green text-sm font-medium hover:underline"
        >
          View all products →
        </Link>
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading products...</p>}
      {error && (
        <p className="text-red-500 text-sm">Couldn't load products: {error}</p>
      )}

      {!loading && !error && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {bestSellers.map((product) => (
              <div key={product._id} className="min-w-[180px] max-w-[180px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 border border-gray-100"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      )}
    </section>
  );
}

export default BestSellingProducts;
