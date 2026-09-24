import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";

function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-2">Your wishlist is empty.</p>
        <Link to="/" className="text-brand-green font-medium hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-5">
        My Wishlist ({items.length})
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
