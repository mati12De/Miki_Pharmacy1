import { useState } from "react";
import {
  Search,
  Package,
  RotateCcw,
  FileText,
  CreditCard,
  ShieldCheck,
  Truck,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

const topics = [
  { label: "Orders & Tracking", icon: Package },
  { label: "Returns & Refunds", icon: RotateCcw },
  { label: "Prescriptions", icon: FileText },
  { label: "Payments", icon: CreditCard },
  { label: "Account & Security", icon: ShieldCheck },
  { label: "Delivery Info", icon: Truck },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3-5 business days. Express delivery arrives in 1-2 business days.",
  },
  {
    q: "Can I upload a prescription after placing an order?",
    a: "Yes, you can upload it anytime from your Account > Prescriptions page and link it to your order.",
  },
  {
    q: "What is your return policy?",
    a: "Unopened medicines can be returned within 7 days of delivery. Devices have a 30-day return window.",
  },
  {
    q: "How do I cancel an order?",
    a: "You can cancel from Account > My Orders as long as the order hasn't shipped yet.",
  },
];

function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState(null);

  function toggleFaq(index) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Help Center
      </h1>

      <div className="max-w-xl mx-auto relative mb-10">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search for help articles..."
          className="w-full border border-gray-300 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-green"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.label}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-brand-green transition-colors"
            >
              <div className="bg-green-50 rounded-full p-3">
                <Icon size={20} className="text-brand-green" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {topic.label}
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="font-bold text-gray-900 text-center mb-4">
        Still need help?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
        <div className="border border-gray-100 rounded-xl p-5 text-center">
          <MessageCircle size={22} className="mx-auto text-brand-green mb-2" />
          <div className="text-sm font-medium text-gray-900 mb-2">
            Live Chat
          </div>
          <button className="bg-brand-green text-white text-xs font-medium px-4 py-2 rounded-lg">
            Start Chat
          </button>
        </div>
        <div className="border border-gray-100 rounded-xl p-5 text-center">
          <Phone size={22} className="mx-auto text-brand-green mb-2" />
          <div className="text-sm font-medium text-gray-900">Call Us</div>
          <div className="text-xs text-gray-500 mt-1">1-800-555-0199</div>
        </div>
        <div className="border border-gray-100 rounded-xl p-5 text-center">
          <Mail size={22} className="mx-auto text-brand-green mb-2" />
          <div className="text-sm font-medium text-gray-900">Email Us</div>
          <div className="text-xs text-gray-500 mt-1">
            support@mikipharmacy.com
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900"
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-3 text-sm text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;
