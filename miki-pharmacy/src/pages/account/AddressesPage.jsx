import { useState } from "react";
import { MapPin, Trash2, Plus } from "lucide-react";

function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", street: "123 Main St", city: "Addis Ababa" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", street: "", city: "" });

  function handleAdd(e) {
    e.preventDefault();
    if (!form.label || !form.street || !form.city) return;
    setAddresses((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm({ label: "", street: "", city: "" });
    setShowForm(false);
  }

  function handleDelete(id) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Addresses</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-brand-green font-medium"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-white border border-gray-100 rounded-xl p-4 mb-4 space-y-3"
        >
          <input
            type="text"
            placeholder="Label (e.g. Home, Work)"
            value={form.label}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, label: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={form.street}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, street: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, city: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-brand-green text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            Save Address
          </button>
        </form>
      )}

      <div className="space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-start justify-between bg-white border border-gray-100 rounded-xl p-4"
          >
            <div className="flex gap-3">
              <MapPin size={18} className="text-brand-green mt-0.5" />
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {addr.label}
                </div>
                <div className="text-xs text-gray-500">
                  {addr.street}, {addr.city}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(addr.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddressesPage;
