import { Truck, Tag, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Super Fast Delivery",
    subtitle: "On time, every time",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    icon: Tag,
    title: "Best Prices",
    subtitle: "Save more on every order",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    subtitle: "100% safe & secure",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    subtitle: "We're here to help you",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
];

function FeatureStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
      <div className="bg-white rounded-2xl shadow-md grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex items-center gap-3 p-5">
              <div className={`${feature.bg} rounded-full p-3`}>
                <Icon size={20} className={feature.color} />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900">
                  {feature.title}
                </div>
                <div className="text-xs text-gray-500">{feature.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureStrip;
