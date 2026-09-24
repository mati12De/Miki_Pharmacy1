import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const FREE_DELIVERY_THRESHOLD = 25;
const DELIVERY_FEE = 4.99;

function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 bg-brand-green text-white font-medium px-6 py-3 rounded-lg"
        >
          Shop Medicines
        </Link>
      </div>
    );
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Shopping Cart{" "}
        <span className="text-gray-400 font-normal text-lg">
          ({items.length})
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Item list */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg bg-gray-50"
              />

              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">{item.variant}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 text-sm font-medium w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-sm font-semibold text-gray-900 w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-4">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>

            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <p className="text-xs text-brand-green bg-green-50 rounded-lg p-2 mt-3">
                Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for
                free delivery
              </p>
            )}

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-brand-green text-white font-medium py-3 rounded-lg mt-5"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-400 text-center mt-3">
              🔒 Secure checkout, your data is protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
