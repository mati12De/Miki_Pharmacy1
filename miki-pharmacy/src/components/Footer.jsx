import { useState } from "react";
import { Link } from "react-router-dom";

const shopLinks = [
  { name: "Medicines", path: "/category/medicines" },
  { name: "Health Care", path: "/category/health-care" },
  { name: "Personal Care", path: "/category/personal-care" },
  { name: "Baby Care", path: "/category/baby-care" },
  { name: "Devices", path: "/category/devices" },
  { name: "Offers", path: "/offers" },
];
const serviceLinks = [
  { name: "My Account", path: "/account" },
  { name: "Track Order", path: "/account/orders" },
  { name: "Returns & Refunds", path: "/info/returns-refunds" },
  { name: "Shipping Policy", path: "/info/shipping-policy" },
  { name: "Payment Methods", path: "/info/payment-methods" },
  { name: "Help Center", path: "/help" },
];
const aboutLinks = [
  { name: "About Miki", path: "/info/about" },
  { name: "Our Stores", path: "/stores" },
  { name: "Careers", path: "/info/careers" },
  { name: "Blog", path: "/info/blog" },
  { name: "Contact Us", path: "/info/contact-us" },
];

function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      {...props}
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="18"
      height="18"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      {...props}
    >
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.8 3.6A11.4 11.4 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.7.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.4a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2.3-2.3z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      {...props}
    >
      <path d="M22 12s0-3.2-.4-4.7a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.8 2.8 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7c.2 1 1 1.7 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.8 2.8 0 0 0 2-2c.4-1.5.4-4.7.4-4.7zM10 15.3V8.7l6 3.3-6 3.3z" />
    </svg>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="text-gray-300 text-sm hover:text-white"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <div className="text-xl font-bold">Miki</div>
          <div className="text-xs tracking-widest text-gray-400 mb-3">
            PHARMACY
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Miki Pharmacy is your trusted online pharmacy for genuine medicines
            and healthcare products.
          </p>
          <div className="flex gap-3">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <YoutubeIcon />
          </div>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Customer Service" links={serviceLinks} />
        <FooterColumn title="About Us" links={aboutLinks} />

        <div>
          <h4 className="font-semibold text-white mb-3">Stay in the loop</h4>
          <p className="text-sm text-gray-300 mb-3">
            Subscribe to get updates on offers and health tips.
          </p>
          {subscribed ? (
            <p className="text-sm text-green-400">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-sm text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-green px-4 rounded-r-lg text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 flex justify-between text-xs text-gray-400">
        <span>© 2026 Miki Pharmacy. All Rights Reserved.</span>
        <div className="flex gap-4">
          <Link to="/info/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/info/terms" className="hover:text-white">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
