import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  { to: "/account", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/account/orders", label: "My Orders", icon: Package },
  { to: "/account/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  {
    to: "/account/payment-methods",
    label: "Payment Methods",
    icon: CreditCard,
  },
  { to: "/account/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/settings", label: "Account Settings", icon: Settings },
];

function AccountSidebar() {
  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }

  return (
    <aside className="w-full md:w-60 shrink-0">
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-green-50 text-brand-green"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}

        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full mt-4"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </nav>
    </aside>
  );
}

export default AccountSidebar;
