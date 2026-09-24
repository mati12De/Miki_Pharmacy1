import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";

const STEPS = [
  "Upload prescription",
  "We verify your order",
  "Fast delivery to your door",
];

function PrescriptionsPage() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploaded, setUploaded] = useState([
    { name: "blood-pressure-rx.jpg", status: "Verified" },
    { name: "allergy-meds.pdf", status: "Pending Review" },
  ]);
  const fileInputRef = useRef(null);

  function addFiles(newFiles) {
    const fileArray = Array.from(newFiles).map((file) => ({
      file,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setFiles((prev) => [...prev, ...fileArray]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleFileSelect(e) {
    addFiles(e.target.files);
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) return;

    setSubmitting(true);

    setTimeout(() => {
      const newEntries = files.map((f) => ({
        name: f.file.name,
        status: "Pending Review",
      }));
      setUploaded((prev) => [...newEntries, ...prev]);
      setFiles([]);
      setPatientName("");
      setDoctorName("");
      setNotes("");
      setSubmitting(false);
    }, 1000);
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        Upload Prescription
      </h1>
      <p className="text-sm text-gray-500 mb-5">
        Get your medicines delivered in 3 easy steps
      </p>

      {/* Step strip */}
      <div className="flex items-center gap-2 bg-brand-bg rounded-xl p-4 mb-6 overflow-x-auto">
        {STEPS.map((step, index) => (
          <div key={step} className="flex items-center gap-2 shrink-0">
            <span className="bg-white text-brand-green text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {index + 1}
            </span>
            <span className="text-xs text-gray-700">{step}</span>
            {index < STEPS.length - 1 && (
              <span className="text-gray-300 mx-2">—</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-brand-green bg-green-50"
              : "border-gray-300 bg-white"
          }`}
        >
          <Upload size={32} className="mx-auto text-gray-400 mb-3" />
          <p className="text-sm font-medium text-gray-700">
            Drag & drop your prescription or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Selected files preview */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-2"
              >
                {f.previewUrl ? (
                  <img
                    src={f.previewUrl}
                    alt=""
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                    <FileText size={18} className="text-gray-400" />
                  </div>
                )}
                <span className="flex-1 text-sm text-gray-700 truncate">
                  {f.file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Details form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Doctor's Name (optional)"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <textarea
          placeholder="Notes or instructions (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-3"
        />

        <button
          type="submit"
          disabled={files.length === 0 || submitting}
          className="w-full bg-brand-green text-white font-medium py-3 rounded-lg mt-4 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Prescription"}
        </button>
      </form>

      {/* Previously uploaded */}
      <div className="mt-8">
        <h2 className="font-bold text-gray-900 mb-3">Previously Uploaded</h2>
        <div className="space-y-2">
          {uploaded.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Verified: "bg-green-100 text-green-700",
    "Pending Review": "bg-orange-100 text-orange-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${styles[status]}`}
    >
      {status === "Verified" && <CheckCircle2 size={12} />}
      {status}
    </span>
  );
}

export default PrescriptionsPage;
