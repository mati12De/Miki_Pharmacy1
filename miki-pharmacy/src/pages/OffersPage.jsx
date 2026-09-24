import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

function OffersPage() {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <p className="text-center py-16 text-gray-400">Loading products...</p>
    );
  if (error)
    return (
      <p className="text-center py-16 text-red-500">
        Couldn't load products: {error}
      </p>
    );

  const discountedProducts = products.filter((p) => p.originalPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Special Offers</h1>
      <p className="text-gray-500 text-sm mb-6">
        {discountedProducts.length} discounted products
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {discountedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
