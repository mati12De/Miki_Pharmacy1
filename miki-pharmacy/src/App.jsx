import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AccountLayout from "./layouts/AccountLayout";
import DashboardPage from "./pages/account/DashboardPage";
import OrdersPage from "./pages/account/OrdersPage";
import OrderDetailPage from "./pages/account/OrderDetailPage";
import PrescriptionsPage from "./pages/account/PrescriptionsPage";
import AddressesPage from "./pages/account/AddressesPage";
import WishlistPage from "./pages/account/WishlistPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import SearchPage from "./pages/SearchPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import AllProductsPage from "./pages/AllProductsPage";
import OffersPage from "./pages/OffersPage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import InfoPage from "./pages/InfoPage";

function App() {
  return (
    <div>
      <TopBar />
      <Header />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories" element={<AllCategoriesPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/stores" element={<StoreLocatorPage />} />
        <Route path="/info/:slug" element={<InfoPage />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailPage />} />
          <Route path="prescriptions" element={<PrescriptionsPage />} />
          <Route path="addresses" element={<AddressesPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
