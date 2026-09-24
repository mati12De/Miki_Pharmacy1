import { Link } from "react-router-dom";
import { orders } from "../../data/orders";

function OrdersPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-5">My Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/account/orders/${order.id}`}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={order.items[0].image}
                alt=""
                className="w-12 h-12 rounded-lg object-cover bg-gray-50"
              />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {order.id}
                </div>
                <div className="text-xs text-gray-500">
                  {order.date} · {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </div>
              </div>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.status}
            </span>
            <span className="font-semibold text-gray-900 text-sm">
              ${order.total.toFixed(2)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
