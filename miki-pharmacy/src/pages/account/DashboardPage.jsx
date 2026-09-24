import { Link } from "react-router-dom";
import { Package, FileText, Heart } from "lucide-react";
import { orders } from "../../data/orders";
import { useWishlist } from "../../context/WishlistContext";

function DashboardPage() {
  const recentOrders = orders.slice(0, 3);
  const { items: wishlistItems } = useWishlist();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back, Mati 👋
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Here's what's happening with your account.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          icon={Package}
          label="Active Orders"
          value={orders.filter((o) => o.status !== "Delivered").length}
        />
        <SummaryCard icon={FileText} label="Prescriptions Pending" value={0} />
        <SummaryCard
          icon={Heart}
          label="Wishlist Items"
          value={wishlistItems.length}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Recent Orders</h2>
        <Link
          to="/account/orders"
          className="text-brand-green text-sm font-medium hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {recentOrders.map((order) => (
          <Link
            key={order.id}
            to={`/account/orders/${order.id}`}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm"
          >
            <div>
              <div className="font-medium text-gray-900 text-sm">
                {order.id}
              </div>
              <div className="text-xs text-gray-500">{order.date}</div>
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

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
      <div className="bg-green-50 rounded-full p-3">
        <Icon size={20} className="text-brand-green" />
      </div>
      <div>
        <div className="text-lg font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default DashboardPage;
