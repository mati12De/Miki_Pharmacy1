import { useParams, Link } from "react-router-dom";
import { infoPages } from "../data/infoPages";

function InfoPage() {
  const { slug } = useParams();
  const page = infoPages[slug];

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Page not found.</p>
        <Link to="/" className="text-brand-green hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{page.title}</h1>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        {page.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default InfoPage;
