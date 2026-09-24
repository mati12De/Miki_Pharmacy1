import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Wallet, Banknote } from "lucide-react";
import { useCart } from "../context/CartContext";

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    time: "3-5 business days",
    price: 0,
  },
  {
    id: "express",
    label: "Express Delivery",
    time: "1-2 business days",
    price: 5.99,
  },
];

const PAYMENT_OPTIONS = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "mobile", label: "Mobile Money", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    phone: "",
  });
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [placing, setPlacing] = useState(false);

  const selectedDelivery = DELIVERY_OPTIONS.find(
    (d) => d.id === deliveryOption,
  );
  const total = subtotal + selectedDelivery.price;

  function handleAddressChange(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  function handleCardChange(field, value) {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    if (
      !address.fullName ||
      !address.street ||
      !address.city ||
      !address.phone
    ) {
      alert("Please fill in your full delivery address.");
      return;
    }

    setPlacing(true);

    setTimeout(() => {
      clearCart();
      navigate("/");
      alert("Order placed successfully!");
    }, 1000);
  }

  if (items.length === 0 && !placing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">
          Your cart is empty — nothing to check out.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form
        onSubmit={handlePlaceOrder}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Left: forms */}
        <div className="flex-1 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-brand-green" /> Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) =>
                  handleAddressChange("fullName", e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => handleAddressChange("phone", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm md:col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 mb-4">Delivery Method</h2>
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                    deliveryOption === option.id
                      ? "border-brand-green bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === option.id}
                      onChange={() => setDeliveryOption(option.id)}
                      className="accent-brand-green"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-500">{option.time}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {option.price === 0
                      ? "Free"
                      : `$${option.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PAYMENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`flex flex-col items-center gap-2 border rounded-lg py-3 ${
                      paymentMethod === option.id
                        ? "border-brand-green bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        paymentMethod === option.id
                          ? "text-brand-green"
                          : "text-gray-500"
                      }
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => handleCardChange("number", e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardChange("expiry", e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) => handleCardChange("cvc", e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-4">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  {selectedDelivery.price === 0
                    ? "Free"
                    : `$${selectedDelivery.price.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-brand-green text-white font-medium py-3 rounded-lg mt-5 disabled:opacity-60"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
