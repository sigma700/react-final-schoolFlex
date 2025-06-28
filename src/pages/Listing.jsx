import React, { useState } from "react";
// import { useAuthStore } from "../store/authStore";
import { useSchoolStore } from "../store/schoolStore";

export default function Listing() {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("");
  const [fee, setFee] = useState("");

  const { createSchool, isLoading, error, value } = useSchoolStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSchool({
      name,
      location,
      contacts,
      category,
      system,
    });
  };

  return (
    <main
      className="text-black h-full lg:min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed bg-gradient-to-r from-blue-800 to-indigo-900"
      style={{
        backgroundImage: "url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg')",
        height: "screen",
        objectFit: "cover",
      }}
    >
      {/* Semi-transparent overlay */}

      <div className="z-10 w-full max-w-2xl px-4 ">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-700">
            List Your School
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Help others discover your institution
          </p>

          <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 text-center mb-4">
              Upload School Image
            </h2>
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition duration-200"
                type="button"
              >
                Upload Image
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSpacer>
                <Label text="School Name" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter school name"
                />
              </FormSpacer>

              <FormSpacer>
                <Label text="Location" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="School location"
                />
              </FormSpacer>

              <FormSpacer>
                <Label text="School Type" />
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  placeholder="Public/Private/International"
                />
              </FormSpacer>

              <FormSpacer>
                <Label text="Fees per term" />
                <Input
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  type="text"
                  placeholder="Approximate fees"
                />
              </FormSpacer>

              <FormSpacer>
                <Label text="Contact Details" />
                <Input
                  value={contacts}
                  onChange={(e) => setContacts(e.target.value)}
                  type="text"
                  placeholder="Phone or email"
                />
              </FormSpacer>

              <FormSpacer>
                <Label text="Curriculum System" />
                <Input
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  type="text"
                  placeholder="CBC, 8-4-4, etc."
                />
              </FormSpacer>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              className={`w-full py-3 px-4 rounded-xl font-semibold transition duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating school..." : "Add Your School"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export function Label({ htmlFor, text }) {
  return (
    <label
      className="text-base md:text-lg font-medium text-gray-700 mb-1"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
}
export function Input({ name, type, placeholder, value, onChange, required }) {
  return (
    <input
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

export function FormSpacer({ children }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}
