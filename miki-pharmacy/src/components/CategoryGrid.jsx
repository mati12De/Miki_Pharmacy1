import { Link } from "react-router-dom";
import { categories } from "../data/categories";

function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Shop by Category</h2>
        <Link
          to="/categories"
          className="text-brand-green text-sm font-medium hover:underline"
        >
          View all categories →
        </Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              to={cat.path}
              className="bg-white rounded-lg border border-gray-100 p-3 flex flex-col items-center text-center hover:border-brand-green transition-colors"
            >
              <div
                className={`${cat.bg} rounded-full w-14 h-14 flex items-center justify-center mb-2`}
              >
                <Icon size={24} className={cat.color} />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {cat.name}
              </span>
              <span className="text-[11px] font-semibold text-brand-green tracking-wide mt-0.5">
                UP TO 20% OFF
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryGrid;
