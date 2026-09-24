import { Link } from "react-router-dom";
import {
  Bike,
  FileText,
  Upload,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload prescription" },
  { icon: ShieldCheck, label: "We verify your order" },
  { icon: PackageCheck, label: "Fast delivery to your door" },
];

function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Free Delivery</h3>
            <p className="text-sm text-gray-600">on orders over $25</p>
            <p className="text-xs text-gray-500 mt-2">
              Fast, safe & contactless delivery at your doorstep.
            </p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <Link
              to="/products"
              className="bg-brand-green text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              Order Now
            </Link>
            <Bike size={40} className="text-brand-green" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Upload Prescription</h3>
            <p className="text-sm text-gray-600">
              Get your medicines delivered in 3 easy steps.
            </p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <Link
              to="/account/prescriptions"
              className="border border-brand-green text-brand-green text-sm font-medium px-4 py-2 rounded-lg"
            >
              Upload Now
            </Link>
            <FileText size={40} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-brand-bg rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">How it works?</h3>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-20">
                    <div className="bg-white rounded-full p-3 shadow-sm mb-2">
                      <Icon size={20} className="text-brand-green" />
                    </div>
                    <span className="text-[11px] text-gray-600">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-4 h-px bg-gray-300 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanners;
