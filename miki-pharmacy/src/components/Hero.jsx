import { Link } from "react-router-dom";
import { ShieldCheck, Lock, RotateCcw, Headphones, Star } from "lucide-react";
import zeleImg from "../assets/zele.jpg";

function Hero() {
  return (
    <section className="bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Your Health, <br />
            <span className="text-brand-green">Our Commitment.</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-md">
            Genuine medicines, trusted brands and healthcare delivered to your
            doorstep.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/category/medicines"
              className="bg-brand-green text-white px-6 py-3 rounded-lg font-medium"
            >
              Shop Medicines
            </Link>
            <Link
              to="/account/prescriptions"
              className="border border-gray-300 px-6 py-3 rounded-lg font-medium"
            >
              Upload Prescription
            </Link>
          </div>

          <div className="flex gap-6 mt-8 flex-wrap">
            <TrustItem
              icon={<ShieldCheck size={20} />}
              label="100% Genuine Products"
            />
            <TrustItem icon={<Lock size={20} />} label="Secure Payments" />
            <TrustItem icon={<RotateCcw size={20} />} label="Easy Returns" />
            <TrustItem icon={<Headphones size={20} />} label="24/7 Support" />
          </div>
        </div>

        <div className="relative">
          <img
            src={zeleImg}
            alt="Pharmacist"
            className="rounded-2xl w-full object-cover"
          />

          <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
            <div className="flex items-center gap-2">
              <div className="bg-brand-green rounded-full p-1">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Trusted by 2M+ Customers
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-brand-green">{icon}</span>
      {label}
    </div>
  );
}

export default Hero;
