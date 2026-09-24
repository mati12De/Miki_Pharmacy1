import { useState } from "react";

const subCategories = ["Tablet", "Capsule", "Syrup", "Injection"];
const brandOptions = [
  "Cipla",
  "Sun Pharma",
  "Dr. Reddy's",
  "Abbott",
  "Zydus",
  "Sanofi",
  "Mankind",
];

function FilterSidebar({ onFilterChange }) {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  function toggleValue(list, setList, value) {
    const newList = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    setList(newList);
    return newList;
  }

  function handleVariantToggle(item) {
    const newVariants = toggleValue(
      selectedVariants,
      setSelectedVariants,
      item,
    );
    onFilterChange({
      variants: newVariants,
      brands: selectedBrands,
      inStockOnly,
    });
  }

  function handleBrandToggle(brand) {
    const newBrands = toggleValue(selectedBrands, setSelectedBrands, brand);
    onFilterChange({
      variants: selectedVariants,
      brands: newBrands,
      inStockOnly,
    });
  }

  function handleStockToggle(checked) {
    setInStockOnly(checked);
    onFilterChange({
      variants: selectedVariants,
      brands: selectedBrands,
      inStockOnly: checked,
    });
  }

  return (
    <aside className="w-full md:w-56 shrink-0 space-y-6">
      <div>
        <h4 className="font-semibold text-sm text-gray-900 mb-3">
          Sub-category
        </h4>
        {subCategories.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-sm text-gray-600 mb-2"
          >
            <input
              type="checkbox"
              className="accent-brand-green"
              checked={selectedVariants.includes(item)}
              onChange={() => handleVariantToggle(item)}
            />
            {item}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-semibold text-sm text-gray-900 mb-3">Brand</h4>
        {brandOptions.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 text-sm text-gray-600 mb-2"
          >
            <input
              type="checkbox"
              className="accent-brand-green"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandToggle(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-semibold text-sm text-gray-900 mb-3">
          Availability
        </h4>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="accent-brand-green"
            checked={inStockOnly}
            onChange={(e) => handleStockToggle(e.target.checked)}
          />
          In Stock Only
        </label>
      </div>
    </aside>
  );
}

export default FilterSidebar;
