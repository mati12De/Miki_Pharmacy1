import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="bg-brand-dark text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        <span>Free delivery on all orders above $25</span>
        <div className="flex gap-4">
          <Link to="/stores" className="hover:underline">
            Store Locator
          </Link>
          <Link to="/account/orders" className="hover:underline">
            Track Order
          </Link>
          <Link to="/help" className="hover:underline">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
