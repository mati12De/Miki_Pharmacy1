import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { _id, name, variant, price, originalPrice, image } = product;
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(_id);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  function handleWishlistToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  return (
    <Link
      to={`/product/${_id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative"
    >
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={16}
          className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      <div className="bg-gray-50 aspect-square flex items-center justify-center p-4">
        <img src={image} alt={name} className="max-h-full object-contain" />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="font-medium text-sm text-gray-900 line-clamp-2">
          {name}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{variant}</div>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 bg-brand-green text-white text-sm font-medium py-2 rounded-lg hover:bg-brand-dark transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
