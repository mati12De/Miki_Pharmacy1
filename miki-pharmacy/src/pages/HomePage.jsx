import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import CategoryGrid from "../components/CategoryGrid";
import BestSellingProducts from "../components/BestSellingProducts";
import PromoBanners from "../components/PromoBanners";
import TrustedBrands from "../components/TrustedBrands";

function HomePage() {
  return (
    <div>
      <Hero />
      <FeatureStrip />
      <CategoryGrid />
      <BestSellingProducts />
      <PromoBanners />
      <TrustedBrands />
    </div>
  );
}

export default HomePage;
