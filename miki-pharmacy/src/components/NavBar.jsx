import { Link } from "react-router-dom";

const navLinks = [
  { name: "Medicines", path: "/category/medicines" },
  { name: "Health Care", path: "/category/health-care" },
  { name: "Personal Care", path: "/category/personal-care" },
  { name: "Baby Care", path: "/category/baby-care" },
  { name: "Wellness", path: "/category/wellness" },
  { name: "Devices", path: "/category/devices" },
  { name: "Health Conditions", path: "/category/health-conditions" },
  { name: "Offers", path: "/offers", hot: true },
];

function NavBar() {
  return (
    <nav className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-3 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-1 text-gray-700 hover:text-brand-green font-medium"
          >
            {link.name}
            {link.hot && (
              <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                Hot
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
