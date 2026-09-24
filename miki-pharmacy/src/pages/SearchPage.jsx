import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useProducts } from "../context/ProductsContext";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { products, loading, error } = useProducts();
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

  const results = products.filter((p) => {
    if (!p.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand))
      return false;
    if (filters.variants.length > 0 && !filters.variants.includes(p.variant))
      return false;
    if (filters.inStockOnly && p.inStock === false) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-1">
        <Link to="/" className="hover:text-brand-green">
          Home
        </Link>{" "}
        {" > "} Search
      </p>
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="flex-1">
          {results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-2">
                No results found for "{query}".
              </p>
              <Link
                to="/"
                className="text-brand-green font-medium hover:underline"
              >
                Browse categories instead
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
