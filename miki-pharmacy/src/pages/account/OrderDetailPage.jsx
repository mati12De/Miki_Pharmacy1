import { useParams, Link } from "react-router-dom";
import { Check, Package, Truck, Home } from "lucide-react";
import { orders } from "../../data/orders";

const STEPS = ["Order Placed", "Processing", "Out for Delivery", "Delivered"];
const STEP_ICONS = [Check, Package, Truck, Home];

function OrderDetailPage() {
  const { orderId } = useParams();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/account/orders" className="text-brand-green hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex =
    order.status === "Delivered" ? 3 : order.status === "Processing" ? 1 : 0;

  return (
    <div>
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/account/orders" className="hover:text-brand-green">
          My Orders
        </Link>{" "}
        {" > "} {order.id}
      </div>

      <h1 className="text-xl font-bold text-gray-900">{order.id}</h1>
      <p className="text-sm text-gray-500 mb-6">Placed on {order.date}</p>

      {/* Progress tracker */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center">
          {STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            const isComplete = index <= currentStepIndex;
            return (
              <div
                key={step}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center text-center w-20">
                  <div
                    className={`rounded-full p-2 ${
                      isComplete
                        ? "bg-brand-green text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-[11px] text-gray-600 mt-1">{step}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${index < currentStepIndex ? "bg-brand-green" : "bg-gray-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="font-bold text-gray-900 mb-4">Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 rounded-lg object-cover bg-gray-50"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
