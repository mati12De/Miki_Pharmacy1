import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useProducts } from "../context/ProductsContext";

function formatCategoryName(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function CategoryPage() {
  const { categoryName } = useParams();
  const { products, loading, error } = useProducts();
  const [sortBy, setSortBy] = useState("popularity");
  const [filters, setFilters] = useState({
    variants: [],
    brands: [],
    inStockOnly: false,
  });

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

  const categoryProducts = products.filter((p) => {
    if (p.category !== categoryName) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand))
      return false;
    if (filters.variants.length > 0 && !filters.variants.includes(p.variant))
      return false;
    if (filters.inStockOnly && p.inStock === false) return false;
    return true;
  });

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-brand-green">
          Home
        </Link>
        {" > "}
        <span className="text-gray-800">
          {formatCategoryName(categoryName)}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {formatCategoryName(categoryName)}
        </h1>
        <span className="text-sm text-gray-500">
          {sortedProducts.length} products
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg text-sm px-3 py-2"
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          {sortedProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-16">
              No products match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
