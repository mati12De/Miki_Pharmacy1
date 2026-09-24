import { Search, User, ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 gap-6">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-brand-dark">Miki</span>
          <span className="text-xs tracking-widest text-textgray">
            PHARMACY
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex">
          <select className="border border-gray-300 rounded-l-lg px-3 py-2 text-sm bg-white">
            <option>All Categories</option>
          </select>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines, healthcare products..."
            className="flex-1 border-t border-b border-gray-300 px-4 py-2 text-sm focus:outline-none"
          />

          <button
            type="submit"
            className="bg-brand-green px-4 rounded-r-lg flex items-center justify-center"
          >
            <Search className="text-white" size={18} />
          </button>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <User className="text-brand-dark" size={22} />

              <div className="text-sm leading-tight">
                <div className="text-textgray">Welcome</div>

                <Link
                  to="/account"
                  className="font-semibold text-brand-dark hover:text-brand-green"
                >
                  {user?.fullName || "My Account"}
                </Link>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 text-gray-400 hover:text-red-500"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="text-brand-dark" size={22} />

              <div className="text-sm leading-tight">
                <div className="text-textgray">Sign In</div>
                <div className="font-semibold text-brand-dark">My Account</div>
              </div>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-brand-dark" size={24} />

            <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
