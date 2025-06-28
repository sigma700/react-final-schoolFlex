import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function School() {
  const [singleSchool, setSingleSchool] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchSingleSchool = async () => {
      try {
        const backUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backUrl}/api/schools/id/${id}`);
        const data = await response.json();
        setSingleSchool(data);
      } catch (error) {
        console.log("Error fetching school", error.message);
      }
    };
    fetchSingleSchool();
  }, [id]);

  return (
    <main className="min-h-screen bg-[#fbf4da] p-4 md:p-8">
      <button
        onClick={() => window.history.back()}
        className="mb-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow transition hover:scale-[1.03] hover:bg-white"
      >
        <svg
          className="h-5 w-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium text-blue-600">Back</span>
      </button>

      {singleSchool ? (
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md md:p-8">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            {singleSchool.data.name}
          </h1>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl">
              <img
                className="h-auto w-full object-cover shadow-md"
                src={singleSchool.data.images[0]}
                alt={singleSchool.data.name}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-blue-50 p-4 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold text-blue-800">
                  About
                </h2>
                <p className="text-gray-700">{singleSchool.data.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 shadow-sm sm:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Location
                    </p>
                    <p className="font-medium">
                      {singleSchool.data.location.county}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Education System
                    </p>
                    <p className="font-medium">
                      {singleSchool.data.system.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Population
                    </p>
                    <p className="font-medium">
                      {singleSchool.data.population} Students
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Fee Range
                    </p>
                    <p className="font-medium">
                      KES {singleSchool.data.fee.min} -{" "}
                      {singleSchool.data.fee.max}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Contact Details
            </h2>
            <p className="text-gray-700">
              {singleSchool.data.contacts ||
                "Contact information not available"}
            </p>
          </div>

          <div className="rounded-xl shadow-md">
            <iframe
              className="h-64 w-full rounded-xl md:h-96"
              src={singleSchool.data.map}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading school information...</p>
          </div>
        </div>
      )}
    </main>
  );
}
