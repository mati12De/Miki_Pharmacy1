const brands = [
  "Cipla",
  "Sun Pharma",
  "Dr. Reddy's",
  "Abbott",
  "Zydus",
  "Sanofi",
  "Mankind",
];

function TrustedBrands() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-center">
      <p className="text-sm text-gray-500 mb-6">
        Trusted by thousands. Powered by quality.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {brands.map((brand) => (
          <span
            key={brand}
            className="text-gray-400 font-semibold text-lg grayscale opacity-70"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TrustedBrands;
