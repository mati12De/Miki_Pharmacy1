import { MapPin, Phone, Clock } from "lucide-react";
import { stores } from "../data/stores";

function StoreLocatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Locator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white border border-gray-100 rounded-xl p-5"
          >
            <h3 className="font-bold text-gray-900 mb-2">{store.name}</h3>
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>
                  {store.address}, {store.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="shrink-0" />
                <span>{store.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreLocatorPage;
