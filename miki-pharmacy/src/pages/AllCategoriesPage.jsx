import { Link } from "react-router-dom";
import { categories } from "../data/categories";

function AllCategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              to={cat.path}
              className="bg-white rounded-lg border border-gray-100 p-6 flex flex-col items-center text-center hover:border-brand-green transition-colors"
            >
              <div
                className={`${cat.bg} rounded-full w-16 h-16 flex items-center justify-center mb-3`}
              >
                <Icon size={28} className={cat.color} />
              </div>
              <span className="font-medium text-gray-900">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AllCategoriesPage;
