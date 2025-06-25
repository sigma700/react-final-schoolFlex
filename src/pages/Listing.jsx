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
    <main className="text-black h-full flex items-center justify-center">
      <style>
        {`
                    main {
                            min-height: 100vh;
                            width: 100vw;
                            background-image: url('/milad-fakurian-GJKx5lhwU3M-unsplash.jpg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            margin: 0;
                            padding: 0;
                    }
            `}
      </style>
      <div>
        <h1 className="lg:text-[30px] text-center mb-[30px]">
          Provide your school info
        </h1>
        <div
          className="lg:w-[480px] w-[350px] p-[20px] lg:p-[100px]"
          style={{
            border: "3px solid #ccc",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          <h2 className="lg:text-[30px] text-blue-600 font-extrabold text-center text-[30px]">
            Upload an Image
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" />
            <button
              className="bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Upload
            </button>

            <FormSpacer>
              <Label text="Name" />
              <Input
                // name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter school name"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Location" />
              <Input
                // name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="School Location"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Type" />
              <Input
                // name="type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Public/Private/International"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="Fees per term" />
              <Input
                // name="fee"
                value={fee} //make a chck here for the store !
                onChange={(e) => setFee(e.target.value)}
                type="text"
                placeholder="School fee per term"
              />
            </FormSpacer>

            <FormSpacer>
              <Label
                text="Contact
              Details"
              />
              <Input
                // name="contact"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
                type="text"
                placeholder="Number or email adress"
              />
            </FormSpacer>

            <FormSpacer>
              <Label text="School system" />
              <Input
                // name="system"
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                type="text"
                placeholder="CBC ,  8-4-4 etc.."
              />
            </FormSpacer>

            <button
              className="bg-blue-500 text-white p-[10px] rounded-[10px] font-extralight w-full mt-6 hover:bg-white hover:text-black hover:cursor-pointer hover:transition-colors hover:duration-[0.3s] hover:border duration-[0.2s]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating school.." : "Add your school"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export function Label({ htmlFor, text }) {
  return (
    <label className="lg:text-[20px]" htmlFor={htmlFor}>
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
      className="p-[10px] rounded-[10px] bg-transparent border lg:w-[300px] "
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

export function FormSpacer({ children }) {
  return <div className="flex flex-col gap-[5px]">{children}</div>;
}
